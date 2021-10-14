export const swap = (arr: number[], i: number, j: number): void => {
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
};
