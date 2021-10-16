import { SwapData } from "./bubble-sort";

export type MergeData = SwapData & {
    k: number;
};
export const mergeSort = (
    arr: number[]
): { sortedArray: number[]; mergeList: MergeData[] } => {
    let sortArr = [...arr];
    let mergeList: MergeData[] = [];
    mergeSortAlgo(sortArr, 0, sortArr.length - 1, mergeList);
    return {
        sortedArray: sortArr,
        mergeList,
    };
};

const mergeSortAlgo = (
    arr: number[],
    low: number,
    high: number,
    mergeList: MergeData[]
) => {
    if (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        mergeSortAlgo(arr, low, mid, mergeList);
        mergeSortAlgo(arr, mid + 1, high, mergeList);
        merge(arr, low, mid, high, mergeList);
    }
};

const merge = (
    arr: number[],
    low: number,
    mid: number,
    high: number,
    mergeList: MergeData[]
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
            mergeList.push({ i: k, j: arr1[i], k: low + i });
            i++;
        } else {
            arr[k] = arr2[j];
            mergeList.push({ i: k, j: arr2[j], k: mid + 1 + j });
            j++;
        }
        k++;
    }

    //if there are anymore items left copy them
    while (i < s1) {
        arr[k] = arr1[i];
        mergeList.push({ i: k, j: arr1[i], k: low + i });
        i++;
        k++;
    }
    while (j < s2) {
        arr[k] = arr2[j];
        mergeList.push({ i: k, j: arr2[j], k: mid + 1 + j });
        j++;
        k++;
    }
};
