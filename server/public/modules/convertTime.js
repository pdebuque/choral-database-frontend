/* 
takes time format of nn'nn" and converts to seconds

e.g., 3'30" ==> 210
*/

function convertTime(string) {
    const stringArr = string.toString().split('\'');
    console.log(stringArr)
    if (stringArr[1]) {
        stringArr[1] = stringArr[1].slice(0, 2);
    }
    return Number(stringArr[0] * 60) + Number(stringArr[1]);
}

// module.exports = convertTime;