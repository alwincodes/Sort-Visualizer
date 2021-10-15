import React, { useEffect, useState } from "react";
import produce from "immer";
import {
    bubbleSort as bubbleSortAlgo,
    SwapData,
} from "./algorithms/bubble-sort";
import { swap } from "./utils/swap";

//fixed size for the array
const arraySize = 20;

//function for generating a new array as needed
const generateNewArray = (): number[] => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
        newArray[i] = Math.round(Math.random() * 50) + 1;
    }
    console.log(newArray);
    return newArray;
};

function App() {
    const [array, setArray] = useState<number[]>(generateNewArray);
    const [swapdata, setSwapData] = useState<SwapData[]>([]);

    const bubbleSort = () => {
        const swapData = bubbleSortAlgo(array);
        const sortBars = document.getElementsByClassName("sortBars");
        for (let i = 0; i < swapData.length; i++) {
            let firstIndex = swapData[i].i;
            let secondIndex = swapData[i].j;
            setTimeout(() => {
                sortBars[firstIndex].innerHTML = "compared";
                sortBars[secondIndex].innerHTML = "compared";
            }, i * 100);
        }
    };

    return (
        <div className="App">
            <div>
                {array.map((item, i) => (
                    <div
                        key={i}
                        className="sortBars"
                        style={{
                            border: "solid",
                            margin: 4,
                            padding: 2,
                            height: 20,
                            width: `${item * 3}0px`,
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
