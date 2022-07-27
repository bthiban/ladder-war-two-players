
const constants = require('./lib/constants');
const ask = require('./src/functions');
const game = require('./src/game');

console.log(`Max Ladder size is : ${constants.LADDER_SIZE} and the input range is  => 0 - ${constants.LADDER_SIZE - 1}` );
  
async function startApp() {
    // console.log('1. calling ask.getPrompt');
    let result = await ask.getPrompt(constants.TEST_TOTALS);
    let inputArray = new Array();

    let i = 0;
    while (i < result.numberOfTestCases) {
        // console.log("2. Going to start game: " + (i + 1));
        let gameInput = await ask.getPrompt(constants.INPUT_PROPS);
        inputArray.push(gameInput);
        i++;
    }

    for (let index = 0; index < inputArray.length; index++) {
        let validationStatus = await ask.getValidate(inputArray[index].inputPattern);

        if(validationStatus == false){
            console.log('Invalid Input Data');
        }else{
            let gameResult = await game.playGame(validationStatus);
            console.log(gameResult);
        }
    }
    
}
  
startApp();



        // let validationStatus = await ask.getValidate(gameInput);
        
        // if(validationStatus == false){
        //     console.log('failed at validation');
        // }else{
        //     console.log('3. Passed after validation');
        //     // console.log(`data after validation ${JSON.stringify(validationStatus)}`);
        //     let gameResult = await game.playGame(validationStatus);
        //     console.log(`4. game result ${JSON.stringify(gameResult)}`);
        //     i++;
        // }

