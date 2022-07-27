
const game = require('../src/game');

let input = { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "8", "playerOnePosition": "11", }
let flipped = { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "8", "playerOnePosition": "6", }
let oneSpaceP1Won= { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "4", "playerOnePosition": "11", }
let twoSpaceP1Won= { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "5", "playerOnePosition": "11", }
let threeSpaceP2Won= { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "6", "playerOnePosition": "11", }
let fourSpaceP1Won= { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "7", "playerOnePosition": "11", }
let deadGameP1Won={ "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "3", "playerOnePosition": "11", }


test('test older player first and won 11 2 6 8', async () => {
    const data = await game.playGame(input);
    expect(data).toBe(1);
});

test('test older player second position and younger lost 6 8 11 2 ', async () => {
    const data = await game.playGame(flipped);
    expect(data).toBe(0);
});

test('test older player won start of the game 11 2 6 3', async () => {
    const data = await game.playGame(deadGameP1Won);
    expect(data).toBe(1);
});

test('test 1 SPACE older player first and won 11 2 6 4', async () => {
    const data = await game.playGame(oneSpaceP1Won);
    expect(data).toBe(1);
});

test('test 2 SPACES older player first and won 11 2 6 5', async () => {
    const data = await game.playGame(twoSpaceP1Won);
    expect(data).toBe(1);
});

test('test 3 SPACES younger player and won 11 2 6 6', async () => {
    const data = await game.playGame(threeSpaceP2Won);
    expect(data).toBe(0);
});

test('test 4 SPACES younger player and won 11 2 6 7', async () => {
    const data = await game.playGame(fourSpaceP1Won);
    expect(data).toBe(0);
});
