import validateNationalIdentityNumber from "national-identity-validator";

const CHAR_VALUES = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  function randomGenerator(i) {
    // CHAR_VALUES.length
    const randomIndex =
      i < 5 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 11);
    const randomElement = CHAR_VALUES[randomIndex];
  
    // console.log({i,randomIndex, randomElement});
    return {
      index: randomIndex,
      value: randomElement,
    };
  }
  
  function createID(userInput) {
    //   const UserInput = "M200698";
    let finalValue = "";
    for (let i = 0; i < 7; i++) {
      let x = randomGenerator(i);
      finalValue += x.value;
    }
    return userInput + finalValue;
  }
  
  function validateNiD(userInput) {
    let y = createID(userInput);
    let result = validateNationalIdentityNumber(y);
    // console.log({y, ...result});
  
    if (result.isNidValid === true) {
      // console.log(y);
      return y;
    } else {
      return validateNiD(userInput);
    }
  }

 export { validateNiD }