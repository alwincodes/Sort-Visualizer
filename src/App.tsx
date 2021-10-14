import React, { useState } from "react";
import produce from "immer";
import { bubbleSort as bubbleSortAlgo } from "./algorithms/bubble-sort";

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
    const bubbleSort = () => {
        setArray(produce(array, bubbleSortAlgo));
    };
    return (
        <div className="App">
            <div>
                {array.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            border: "solid",
                            margin: 5,
                            padding: 2,
                            height: 20,
                            width: `${item * 3}0px`,
                            backgroundColor: "turquoise",
                        }}
                    >
                        {item}
                    </div>
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
