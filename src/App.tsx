import React, { useState } from "react";

import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";

//fixed size for the array
const arraySize = 40;
//animation speed
const animationSpeed = 100;

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
        }, i * animationSpeed - 20);
    }
};

function App() {
    const [array, setArray] = useState<number[]>(generateNewArray);

    const bubbleSort = () => {
        const swapData = bubbleSortAlgo(array);
        const sortBars = Array.from(
            document.getElementsByClassName(
                "sortBars"
            ) as HTMLCollectionOf<HTMLElement>
        );
        animate(swapData, sortBars);
    };

    const selectionSort = () => {};

    const quickSort = () => {};

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
                            padding: 2,
                            height: 2,
                            width: `${item * 2}0px`,
                            backgroundColor: "turquoise",
                        }}
                    ></div>
                ))}
            </div>
            <div>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button>Selection Sort</button>
                <button>Insertion Sort</button>
                <button>Quick Sort</button>
                <button>Merge Sort</button>
                <button onClick={() => setArray(generateNewArray())}>
                    Reset Array
                </button>
            </div>
        </div>
    );
}

export default App;
