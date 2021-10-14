import React, { useState } from "react";

//fixed size for the array
const arraySize = 5;

//function for generating a new array as needed
const generateNewArray = (): number[] => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
        newArray[i] = Math.round(Math.random() * 50);
    }
    console.log(newArray);
    return newArray;
};

function App() {
    const [array, setArray] = useState<number[]>(generateNewArray);
    return (
        <div className="App">
            <div>
                {array.map((item) => (
                    <div
                        key={item}
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
                <button>Bubble Sort</button>
                <button>Selection Sort</button>
                <button>Insertion Sort</button>
                <button>Quick Sort</button>
                <button>Merge Sort</button>
                <button onClick={() => setArray([1, 2, 3])}>Reset Array</button>
            </div>
        </div>
    );
}

export default App;
