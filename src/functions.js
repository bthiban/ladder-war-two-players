const prompt = require('prompt');
const constants = require('../lib/constants');
prompt.start();

const getPrompt = async (props) => {

  return new Promise(resolve => {
    prompt.get(props, function (err, result) {
      try {
        resolve(result);
      } catch (err) {
        throw new Error(err.message);
      }
    });
  });

};

const getValidate = async (inputData) => {
  return new Promise(resolve => {
    let parts = inputData.trim().split(/\s+/);
    let result = false;
    let validChecks = new Array();
    let age = new Array();
    let indexes = new Array();

    parts.forEach(element => {
      validChecks.push(isInt(element));
    });

    for (let index = 0; index < parts.length; index++) {
      if (index % 2 == 0) {
        if (parts[index] < 0) {
          validChecks[index] = false;
        }
        age.push(parts[index]);
      } else {
        indexes.push(parts[index]);
      }
    }


    // detect same age:
    // 11 3 11 6
    let ageCheck = age[0] != age[1] ? true : false;

    // detect overlap indexing when starting the game
    // 10 7 9 2
    // [P1, P1, P1, P1, P1, P1, P1, P1, --, --, --]
    // [00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10]
    // Now player 2 wants to lands in 2 which is already blocked by P1
    let oldPlayer = parseInt(age[0]) > parseInt(age[1]) ? 0 : 1;
    let youngPlayer = oldPlayer == 0 ? 1 : 0;
    // console.log(`old player index in age array ${oldPlayer}`);
    // console.log(`yng player index in age array ${youngPlayer}`);
    // console.log(`old player age ${age[oldPlayer]}`);
    // console.log(`yng player age ${age[youngPlayer]}`);

    let oldPlayerIndex = new Array();
    oldPlayerIndex.push(indexes[oldPlayer]);
    let youngerPlayerIArray = indexes.filter(x => !oldPlayerIndex.includes(x));

    let indexOverNotLapped = !(youngerPlayerIArray[0] >= indexes[oldPlayer]) ? false : true;
    // indexOverNotLapped end.

    // indexes with in the range of constants.LADDER_SIZE
    let indexValidation = indexes.every(x => parseInt(x) <= constants.LADDER_SIZE - 1);
    // console.log(`index validation ${indexValidation}`);

    //check for decimal numbers
    // let haveDecimals = parts.some(x => IsNumeric(x));

    // check all of the validated elements are true &&&& set to false if array size is not 4.
    result = validChecks.every(x => x === true) && validChecks.length == 4 && ageCheck && indexOverNotLapped && indexValidation ;

    let playersProps = {
      oldPlayerAge: age[oldPlayer],
      oldPlayerIdx: indexes[oldPlayer],
      yngPlayerAge: age[youngPlayer],
      yngPlayerIndex: youngerPlayerIArray[0],
      playerOnePosition: parts[0]
    }
    // return array if all ok else, return false
    result == true ? resolve(playersProps) : resolve(result)

  });
};

const isInt = value => !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));

exports.getPrompt = getPrompt;
exports.getValidate = getValidate;


