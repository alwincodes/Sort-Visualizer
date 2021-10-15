import { swap } from "../utils/swap";

export type SwapData = {
    i: number;
    j: number;
};

export const bubbleSort = (stateArr: number[]) => {
    let arr = [...stateArr];
    let swapList: SwapData[] = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                swapList.push({ i: j, j: j + 1 });
                swap(arr, j, j + 1);
            }
        }
    }
    return {
        sortedArr: arr,
        swapList,
    };
};
