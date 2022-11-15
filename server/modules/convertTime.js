function convertDate(string) {
    // take format n'nn" ==> [n,nn] ==> seconds
    const stringArr = string.split('\'');
    console.log(stringArr)
    if (stringArr[1]) {
        stringArr[1] = stringArr[1].slice(0, 1);
        console.log(stringArr[1]);
    }
    return Number(stringArr[0] * 60) + Number(stringArr[1]);
}