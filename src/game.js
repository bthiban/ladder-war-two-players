const constants = require('../lib/constants');

const playGame = async (gameConfig) => {

    return new Promise(resolve => {
        let ladder = new Array(constants.LADDER_SIZE).fill(0);

        //console.log(ladder);

        // land the old player to inside the ladder
        ladder = landOldPlayer(ladder, gameConfig.oldPlayerIdx);
        ladder = landYngPlayer(ladder, gameConfig.yngPlayerIndex);

        let winner = movePositions(ladder);

        // winner - 1 - older player
        // winner - 2 - younger player

        // who is the player one ? gameConfig.playerOnePosition

        if (winner == 1) {
            gameConfig.playerOnePosition == gameConfig.oldPlayerAge ? resolve(1) : resolve(0);
        }

        if (winner == 2) {
            gameConfig.playerOnePosition == gameConfig.yngPlayerAge ? resolve(1) : resolve(0)
        }

    });

};


/**
 * old player starts first 
 */
const landOldPlayer = (ladder, oldPlayerIdx) => {

    for (let index = 0; index < ladder.length; index++) {
        if (parseInt(oldPlayerIdx) >= index) {
            ladder[index] = "OP";
        }

    }

    return ladder;

}

/**
 * old player starts first 
 */
const landYngPlayer = (ladder, yngPlayerIndex) => {

    var index = ladder.length;
    // 7 <= 10, 9, 8, 7
    while (index--) {
        if (parseInt(yngPlayerIndex) <= index) {
            ladder[index] = "YP";
        }
    }

    return ladder;

}


const movePositions = (ladder) => {

    if (doesHaveSpace(ladder)) {
        // count zeros in the array
        let spaces = ladder.filter(v => v === 0).length;

        for (let index = 1; index <= spaces + 1; index++) {
            let playerId = index % 2 == 0 ? 2 : 1;

            ladder = moveOldPlayerPositions(ladder, playerId);

            let spaces = ladder.filter(v => v === 0).length;
            if (spaces == 0) {
                //console.log(`playerId: ` + playerId);
                return playerId; // if = 1 older player won or vise versa
            }

        }
    } else {
        return 1;
    }

}

/**
 * Private functions
 */

const doesHaveSpace = (ladder) => {
    return ladder.filter(v => v === 0).length > 0;
}

const moveOldPlayerPositions = (ladder, playerId) => {

    // move forward
    if (playerId == 1) {
        let currentOldPlayerPosition = 0;
        // 1. find current player positions
        for (let index = 0; index < ladder.length; index++) {
            if (ladder[index] != "OP") {
                currentOldPlayerPosition = index - 1; // because last position found in the previous loop
                break;
            }
        }

        let space = ladder.filter(v => v === 0).length;

        if (space >= 2) {
            // jump 2
            ladder[currentOldPlayerPosition + 1] = "OP";
            ladder[currentOldPlayerPosition + 2] = "OP";
        } else if (space == 1) {
            ladder[currentOldPlayerPosition + 1] = "OP";
        } else {
            ladder;
        }

        return ladder;
    } else {
        let currentNewPlayerPosition = 0;
        for (let index = 0; index < ladder.length; index++) {
            if (ladder[index] == "YP") {
                currentNewPlayerPosition = index; // when see YP in the array, that is the position
                break;
            }
        }

        let space = ladder.filter(v => v === 0).length;


        if ((space) >= 2) {
            ladder[currentNewPlayerPosition - 1] = "YP"; // 7
            ladder[currentNewPlayerPosition - 2] = "YP"; // 6
        } else if ((space) == 1) {
            ladder[currentNewPlayerPosition - 1] = "YP"; // 7
        } else {
            return ladder;
        }

        return ladder;
    }



}

exports.playGame = playGame;
