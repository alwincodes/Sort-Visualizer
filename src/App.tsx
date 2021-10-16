import React, { useState } from "react";

import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";
import { selectionSort as selectionSortAlgo } from "./algorithms/selection-sort";
import { quickSort as quickSortAlgo } from "./algorithms/quick-sort";
import { MergeData, mergeSort as mergeSortAlgo } from "./algorithms/merge-sort";
import "./app.css";

/*
Timeouts
--------
each of the swapping animations to be performed are functions set to trigger at a set delay by using timeout function in javascript
these functions are async this array below is used to keep track of these async functions so that we can stop them when needed
*/
const timeouts: ReturnType<typeof setTimeout>[] = [];

//size of the array dynamic according to screen size
const arrSize = window.innerHeight / 4 - 30;

//function for generating a new array as needed
const generateNewArray = (arraySize: number): number[] => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
        newArray[i] = randomGenerator(1, window.innerWidth - 50);
    }
    return newArray;
};

//this generates a random number between two limits
const randomGenerator = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//this is a mess need to improve this to get better animations
//this is for sorting algorithms which use swapping
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
                //making the swap bars red
                sortBars[firstIndex].style.backgroundColor = "red";
                sortBars[secondIndex].style.backgroundColor = "red";
                //swap them
                let tempW = sortBars[firstIndex].style.width;
                sortBars[firstIndex].style.width =
                    sortBars[secondIndex].style.width;
                sortBars[secondIndex].style.width = tempW;
                //removing the color before next bars are selected for swapping
                setTimeout(() => {
                    sortBars[firstIndex].style.backgroundColor = "turquoise";
                    sortBars[secondIndex].style.backgroundColor = "turquoise";
                }, animationSpeed);
            }, i * animationSpeed)
        );
    }
};

//this is for sorting algorithms which use merging
const mergeAnimate = (mergeData: MergeData[], animationSpeed: number) => {
    const sortBars = Array.from(
        document.getElementsByClassName(
            "sortBars"
        ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < mergeData.length; i++) {
        let index = mergeData[i].i;
        let value = mergeData[i].j;
        let sindex = mergeData[i].k;
        timeouts.push(
            setTimeout(() => {
                //making the swap bars red
                sortBars[index].style.backgroundColor = "red";
                sortBars[sindex].style.backgroundColor = "magenta";
                //merge them
                sortBars[index].style.width = `${value}px`;
                //removing the color before next bars are selected for swapping
                setTimeout(() => {
                    sortBars[index].style.backgroundColor = "turquoise";
                    sortBars[sindex].style.backgroundColor = "turquoise";
                }, animationSpeed);
            }, i * animationSpeed)
        );
    }
};

function App() {
    const [animationSpeed, setAnimSpeed] = useState<number>(100);
    const [array, setArray] = useState<number[]>(generateNewArray(arrSize));
    const [sorting, setSorting] = useState<boolean>(false);

    const bubbleSort = () => {
        const { swapList: swapData } = bubbleSortAlgo(array);
        animate(swapData, animationSpeed);
        setSorting(true);
    };

    const selectionSort = () => {
        const { swapList: swapData } = selectionSortAlgo(array);
        animate(swapData, animationSpeed);
        setSorting(true);
    };

    const quickSort = () => {
        const { swapList: swapData } = quickSortAlgo(array);
        animate(swapData, animationSpeed);
        setSorting(true);
    };

    //not working as of now diffrent logic need to be applied
    const mergeSort = () => {
        const { mergeList: mergeData } = mergeSortAlgo(array);
        // setArray(sortedArray);
        console.log(mergeData);
        mergeAnimate(mergeData, animationSpeed);
        setSorting(true);
    };

    //this is to stop all the swap operations in the callback queue
    const stop = () => {
        for (let i = 0; i < timeouts.length; i++) {
            clearInterval(timeouts[i]);
        }
        setArray(generateNewArray(arrSize));
        setSorting(false);
    };

    const animSpeedChanger = (e: React.FormEvent<HTMLInputElement>) => {
        setAnimSpeed(parseInt(e.currentTarget.value));
    };

    return (
        <div className="App">
            <div className="buttons">
                <button
                    className="mergeOptions"
                    disabled={sorting}
                    onClick={bubbleSort}
                >
                    Bubble Sort
                </button>
                <button
                    className="mergeOptions"
                    disabled={sorting}
                    onClick={selectionSort}
                >
                    Selection Sort
                </button>
                {/* <button>Insertion Sort</button> */}
                <button
                    className="mergeOptions "
                    disabled={sorting}
                    onClick={quickSort}
                >
                    Quick Sort
                </button>
                <button
                    className="mergeOptions"
                    disabled={sorting}
                    onClick={mergeSort}
                >
                    Merge Sort
                </button>
                <button className="mergeOptions warning" onClick={stop}>
                    Reset Array
                </button>
                <button className="mergeOptions danger" onClick={stop}>
                    Stop!
                </button>
                <div className="slider">
                    Faster
                    <input
                        onChange={animSpeedChanger}
                        disabled={sorting}
                        type="range"
                        min="10"
                        max="160"
                        value={animationSpeed}
                    />
                    Slower
                </div>
            </div>

            <div className="visualizer">
                {array.map((item, i) => (
                    <div
                        key={i}
                        className="sortBars"
                        style={{
                            width: `${item}px`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default App;
