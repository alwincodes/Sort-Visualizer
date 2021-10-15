import { SwapData } from "./bubble-sort";

export const mergeSort = (
    arr: number[]
): { sortedArray: number[]; swapList: SwapData[] } => {
    let sortArr = [...arr];
    let swapList: SwapData[] = [];
    mergeSortAlgo(sortArr, 0, sortArr.length - 1, swapList);
    return {
        sortedArray: sortArr,
        swapList,
    };
};

const mergeSortAlgo = (
    arr: number[],
    low: number,
    high: number,
    swapList: SwapData[]
) => {
    if (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        mergeSortAlgo(arr, low, mid, swapList);
        mergeSortAlgo(arr, mid + 1, high, swapList);
        merge(arr, low, mid, high, swapList);
    }
};

const merge = (
    arr: number[],
    low: number,
    mid: number,
    high: number,
    swapList: SwapData[]
) => {
    let s1 = mid - low + 1;
    let s2 = high - mid;
    let arr1: number[] = [];
    let arr2: number[] = [];
    //copy to the arrays
    for (let i = 0; i < s1; i++) {
        arr1[i] = arr[low + i];
    }
    for (let i = 0; i < s2; i++) {
        arr2[i] = arr[mid + 1 + i];
    }

    //acutal merging
    let i = 0,
        j = 0,
        k = low;
    while (i < s1 && j < s2) {
        if (arr1[i] < arr2[j]) {
            arr[k] = arr1[i];
            swapList.push({ i: k, j: low + i });
            i++;
        } else {
            arr[k] = arr2[j];
            swapList.push({ i: k, j: mid + 1 + j });
            j++;
        }
        k++;
    }

    //if there are anymore items left copy them
    while (i < s1) {
        arr[k] = arr1[i];
        swapList.push({ i: k, j: low + i });
        i++;
        k++;
    }
    while (j < s2) {
        arr[k] = arr2[j];
        swapList.push({ i: k, j: mid + 1 + j });
        j++;
        k++;
    }
};
