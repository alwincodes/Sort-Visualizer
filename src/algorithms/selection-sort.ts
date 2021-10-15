import { swap } from "../utils/swap";
import { SwapData } from "./bubble-sort";

export const selectionSort = (
    arr: number[]
): { sortedArray: number[]; swapList: SwapData[] } => {
    let sortArr = [...arr];
    let swapList: SwapData[] = [];
    for (let i = 0; i < sortArr.length; i++) {
        let min_idx = i;
        for (let j = i + 1; j < sortArr.length; j++) {
            if (sortArr[min_idx] > sortArr[j]) {
                min_idx = j;
            }
        }
        swapList.push({ i: min_idx, j: i });
        swap(sortArr, min_idx, i);
    }
    return {
        sortedArray: sortArr,
        swapList,
    };
};
