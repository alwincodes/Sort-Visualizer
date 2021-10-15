import React, { useState } from "react";

import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";
import { selectionSort as selectionSortAlgo } from "./algorithms/selection-sort";
import { quickSort as quickSortAlgo } from "./algorithms/quick-sort";

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
    console.log(newArray);
    return newArray;
};

const animate = (swapData: SwapData[], sortBars: HTMLElement[]): void => {
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
        const { swapList: swapData, sortedArray } = bubbleSortAlgo(array);
        const sortBars = Array.from(
            document.getElementsByClassName(
                "sortBars"
            ) as HTMLCollectionOf<HTMLElement>
        );
        console.log(array, sortedArray);
        animate(swapData, sortBars);
    };

    const selectionSort = () => {
        const { swapList: swapData, sortedArray } = selectionSortAlgo(array);
        const sortBars = Array.from(
            document.getElementsByClassName(
                "sortBars"
            ) as HTMLCollectionOf<HTMLElement>
        );
        console.log(array, sortedArray);
        animate(swapData, sortBars);
    };

    const quickSort = () => {
        const { swapList: swapData, sortedArray } = quickSortAlgo(array);
        const sortBars = Array.from(
            document.getElementsByClassName(
                "sortBars"
            ) as HTMLCollectionOf<HTMLElement>
        );
        console.log(array, sortedArray);
        animate(swapData, sortBars);
    };

    const mergeSort = () => {};

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
                <button>Merge Sort</button>
                <button onClick={() => setArray(generateNewArray())}>
                    Reset Array
                </button>
            </div>
        </div>
    );
}

export default App;
