const fs = require("fs");

// Main //
function main() {
  const data = getData();
  partOne(data);
  partTwo(data);
}

// Functions //

function partOne(inputData) {
  let partOneSum = process(inputData);
  consoleResults("Part ONE", partOneSum);
}

function partTwo(inputData) {
  const allScrates = processTwo(inputData, true);
  const partTwoSum = sumScratches(allScrates);
  consoleResults("Part TWO", partTwoSum);
}

function process(theData) {
  let totalSum = 0;
  Object.keys(theData).forEach((setIndex) => {
    const [winningNums, myNums] = theData[setIndex];

    let worthNums = 0;
    winningNums.forEach((num) => {
      if (myNums.includes(num)) worthNums++;
    });

    if (worthNums == 1) {
      totalSum += 1;
    }
    if (worthNums > 1) {
      let worth = Math.pow(2, worthNums - 1);
      totalSum += worth;
    }
  });

  return totalSum;
}

function processTwo(theData) {
  let worthObject = {};
  Object.keys(theData).forEach((setIndex) => {
    const [winningNums, myNums] = theData[setIndex];

    let worthNums = 0;
    winningNums.forEach((num) => {
      if (myNums.includes(num)) worthNums++;
    });

    worthObject[Number(setIndex)] = worthNums;
  });

  const totalScratches = findScratches(worthObject);
  return totalScratches;
}

function findScratches(wObj) {
  const maxIndex = Object.keys(wObj).length - 1;
  let scrachCards = {};
  Object.keys(wObj).forEach((objIndex) => {
    if (wObj[objIndex] == 0 && !scrachCards[objIndex]) {
      scrachCards[objIndex] = 1;
    }
    if (wObj[objIndex] > 0) {
      if (objIndex == 1) {
        scrachCards[objIndex] = 1;
      }
      if (!scrachCards[objIndex]) {
        scrachCards[objIndex] = 1;
      }
      let start = Number(objIndex) + 1;
      const end =
        Number(objIndex) + wObj[objIndex] < maxIndex
          ? Number(objIndex) + wObj[objIndex]
          : maxIndex;
      while (start <= end) {
        scrachCards[start] = !scrachCards[start]
          ? 1 + scrachCards[objIndex]
          : scrachCards[start] + scrachCards[objIndex];
        start++;
      }
    }
  });
  return scrachCards;
}

function sumScratches(theScratches) {
  let sum = 0;
  const endIndex = Object.keys(theScratches).length;

  for (let i = 0; i < endIndex; i++) {
    sum += theScratches[i];
  }
  return sum;
}

function getData() {
  let dataObject = {};
  const allData = fs.readFileSync("input.txt").toString();
  const dataArray = allData.trim().split("\n");
  dataArray.forEach((line, liIndex) => {
    let lineList = line.split(":")[1];
    let [firstPart, secondPart] = lineList.split("|");

    firstPart = firstPart.match(/\d+/g);
    secondPart = secondPart.match(/\d+/g);

    dataObject[liIndex] = [firstPart, secondPart];
  });
  return dataObject;
}

function consoleResults(part, answer) {
  console.log("Answer for " + part + " is: " + answer);
}

// Run the script
main();
