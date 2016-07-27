const input = [[1, 2, 3], [2, 3], [3]];
const arr = input.reduce((prev, cur) => {
    return prev.concat(cur);
});
arr.sort((a, b) => a > b);
arr.filter((item, i) => {
    
});
