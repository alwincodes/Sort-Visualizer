import { swap } from "../utils/swap";
import { SwapData } from "./bubble-sort";

export const quickSort = (
    arr: number[]
): { sortedArray: number[]; swapList: SwapData[] } => {
    let sortArr = [...arr];
    let swapList: SwapData[] = [];
    quickSortAlgo(sortArr, swapList, 0, sortArr.length - 1);
    return {
        sortedArray: sortArr,
        swapList,
    };
};

const quickSortAlgo = (
    arr: number[],
    swapList: SwapData[],
    l: number,
    h: number
) => {
    while (l < h) {
        let m = partision(arr, swapList, l, h);
        quickSortAlgo(arr, swapList, l, m - 1);
        quickSortAlgo(arr, swapList, m + 1, h);
    }
};

const partision = (
    arr: number[],
    swaplist: SwapData[],
    l: number,
    h: number
): number => {
    let pivot = arr[h];
    let j = l - 1;
    for (let i = l; i < h; i++) {
        if (arr[i] < pivot) {
            swap(arr, i, ++j);
            swaplist.push({ i, j });
        }
    }
    swap(arr, h, ++j);
    swaplist.push({ i: h, j });
    return j;
};
