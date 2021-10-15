import { bubbleSort } from "../algorithms/bubble-sort";
import { sortCheck } from "../utils/sort-check";

const bubbleSortTest = () => {
    let arr = [5, 3, 2, 6, 2, 6, 4];
    let result = sortCheck(arr, bubbleSort(arr).sortedArr);
    console.log(result);
};

export {};
