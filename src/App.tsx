import React, { useState } from "react";

import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";
import { selectionSort as selectionSortAlgo } from "./algorithms/selection-sort";
import { quickSort as quickSortAlgo } from "./algorithms/quick-sort";
import { mergeSort as mergeSortAlgo } from "./algorithms/merge-sort";
import "./app.css";

//timouts
const timeouts: ReturnType<typeof setTimeout>[] = [];

//function for generating a new array as needed
const generateNewArray = (arraySize: number): number[] => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
        newArray[i] = Math.round(Math.random() * 50) + 1;
    }
    return newArray;
};

//this is a mess need to improve this to get better animations
const animate = (swapData: SwapData[], animationSpeed: number): void => {
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
                let tempW = sortBars[firstIndex].style.width;
                sortBars[firstIndex].style.width =
                    sortBars[secondIndex].style.width;
                sortBars[secondIndex].style.width = tempW;
                //removing the color
                setTimeout(() => {
                    sortBars[firstIndex].style.backgroundColor = "turquoise";
                    sortBars[secondIndex].style.backgroundColor = "turquoise";
                }, animationSpeed);
            }, i * animationSpeed)
        );
    }
};

function App() {
    const [arrSize, setArrSize] = useState<number>(window.innerHeight / 4 - 18);
    const [animationSpeed, setAnimSpeed] = useState<number>(100);
    const [array, setArray] = useState<number[]>(generateNewArray(arrSize));

    const bubbleSort = () => {
        const { swapList: swapData } = bubbleSortAlgo(array);
        animate(swapData, animationSpeed);
    };

    const selectionSort = () => {
        const { swapList: swapData } = selectionSortAlgo(array);
        animate(swapData, animationSpeed);
    };

    const quickSort = () => {
        const { swapList: swapData } = quickSortAlgo(array);
        animate(swapData, animationSpeed);
    };

    //not working as of now diffrent logic need to be applied
    const mergeSort = () => {
        const { swapList: swapData, sortedArray } = mergeSortAlgo(array);
        // setArray(sortedArray);
        console.log(swapData);
        animate(swapData, animationSpeed);
    };

    //this is to stop all the swap operations in the callback queue
    const stop = () => {
        for (let i = 0; i < timeouts.length; i++) {
            clearInterval(timeouts[i]);
        }
        setArray(generateNewArray(arrSize));
    };

    return (
        <div className="App">
            <div className="buttons">
                <button className="mergeOptions" onClick={bubbleSort}>
                    Bubble Sort
                </button>
                <button className="mergeOptions" onClick={selectionSort}>
                    Selection Sort
                </button>
                {/* <button>Insertion Sort</button> */}
                <button className="mergeOptions " onClick={quickSort}>
                    Quick Sort
                </button>
                <button className="mergeOptions" onClick={mergeSort}>
                    Merge Sort
                </button>
                <button
                    className="mergeOptions warning"
                    onClick={() => setArray(generateNewArray(arrSize))}
                >
                    Reset Array
                </button>
                <button className="mergeOptions danger" onClick={stop}>
                    Stop!
                </button>
            </div>
            <div className="visualizer">
                {array.map((item, i) => (
                    <div
                        key={i}
                        className="sortBars"
                        style={{
                            width: `${item * 2}0px`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default App;
