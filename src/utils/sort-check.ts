export const sortCheck = (
    unsortedArr: number[],
    sortedArr: number[]
): boolean => {
    let uarr = [...unsortedArr];
    uarr.sort((a, b) => a - b);
    if (uarr.length !== sortedArr.length) return false;
    let same = false;
    for (let i = 0; i < uarr.length; i++) {
        if (sortedArr[i] !== uarr[i]) {
            same = false;
        } else {
            same = true;
        }
    }
    return same;
};
