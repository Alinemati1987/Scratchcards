const fs = require("fs");

// Main //
function main() {
  const data = getData();
  partOne(data);
}

// Functions //

function partOne(inputData) {
  let partOneSum = process(inputData);
  consoleResults("Part ONE", partOneSum);
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
