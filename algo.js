let arr = "here are 2 students".split(" ");
arr = arr.map(str => {
    return str[0].toUpperCase() + str.slice(1);
});
console.log(arr);
