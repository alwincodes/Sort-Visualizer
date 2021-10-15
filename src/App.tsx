import React, { useState } from "react";

import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";
import { selectionSort as selectionSortAlgo } from "./algorithms/selection-sort";
import { quickSort as quickSortAlgo } from "./algorithms/quick-sort";
import { mergeSort as mergeSortAlgo } from "./algorithms/merge-sort";

//fixed size for the array
const arraySize = 100;
//animation speed
const animationSpeed = 100;
//timouts
const timeouts: ReturnType<typeof setTimeout>[] = [];

//function for generating a new array as needed
const generateNewArray = (): number[] => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
        newArray[i] = Math.round(Math.random() * 50) + 1;
    }
    return newArray;
};

//this is a mess need to improve this to get better animations
const animate = (swapData: SwapData[]): void => {
    const sortBars = Array.from(
        document.getElementsByClassName(
            "sortBars"
        ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < swapData.length; i++) {
        let firstIndex = swapData[i].i;
        let secondIndex = swapData[i].j;
        timeouts.push(
            setTimeout(() => {
                sortBars[firstIndex].style.backgroundColor = "red";
                sortBars[secondIndex].style.backgroundColor = "red";
                //swap them
                let tempH = sortBars[firstIndex].style.width;
                sortBars[firstIndex].style.width =
                    sortBars[secondIndex].style.width;
                sortBars[secondIndex].style.width = tempH;
                //removing the color
                setTimeout(() => {
                    sortBars[firstIndex].style.backgroundColor = "turquoise";
                    sortBars[secondIndex].style.backgroundColor = "turquoise";
                }, animationSpeed - 20);
            }, i * animationSpeed - 20)
        );
    }
};

function App() {
    const [array, setArray] = useState<number[]>(generateNewArray);

    const bubbleSort = () => {
        const { swapList: swapData } = bubbleSortAlgo(array);
        animate(swapData);
    };

    const selectionSort = () => {
        const { swapList: swapData } = selectionSortAlgo(array);
        animate(swapData);
    };

    const quickSort = () => {
        const { swapList: swapData } = quickSortAlgo(array);
        animate(swapData);
    };

    //not working as of now diffrent logic need to be applied
    const mergeSort = () => {
        const { swapList: swapData, sortedArray } = mergeSortAlgo(array);
        setArray(sortedArray);
        console.log(swapData);
        // animate(swapData);
    };

    const stop = () => {
        for (let i = 0; i < timeouts.length; i++) {
            clearInterval(timeouts[i]);
        }
        setArray(generateNewArray());
    };

    return (
        <div className="App">
            <div>
                {array.map((item, i) => (
                    <div
                        key={i}
                        className="sortBars"
                        style={{
                            margin: 2,
                            padding: 1,
                            height: 2,
                            width: `${item * 2}0px`,
                            backgroundColor: "turquoise",
                        }}
                    ></div>
                ))}
            </div>
            <div>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button onClick={selectionSort}>Selection Sort</button>
                <button>Insertion Sort</button>
                <button onClick={quickSort}>Quick Sort</button>
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={() => setArray(generateNewArray())}>
                    Reset Array
                </button>
                <button onClick={stop}>Stop!</button>
            </div>
        </div>
    );
}

export default App;
