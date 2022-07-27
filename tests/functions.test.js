const functions = require('../src/functions');
const constants = require('../lib/constants');
const prompt = require('prompt');

let output = { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "8", "playerOnePosition": "11", }
let flipped = { "oldPlayerAge": "11", "oldPlayerIdx": "2", "yngPlayerAge": "6", "yngPlayerIndex": "8", "playerOnePosition": "6", }

test('test decimal false- 11 2.1 11 3', async () => {
    const data = await functions.getValidate("11 2.1 11 3");
    expect(data).toBe(false);
});

test('test the same age false - 1 2 11 3', async () => {
    const data = await functions.getValidate("11 2 11 3");
    expect(data).toBe(false);
});

test('test no numeric input at Player1 Age xx 2 13 4', async () => {
    const data = await functions.getValidate("xx 2 13 4");
    expect(data).toBe(false);
});

test('test no numeric input at Player1 position - 11 xx 14 6', async () => {
    const data = await functions.getValidate("11 xx 14 6");
    expect(data).toBe(false);
});

test('test no numeric input at Player2 Age - 11 3 xx 6', async () => {
    const data = await functions.getValidate("11 3 xx 6");
    expect(data).toBe(false);
});

test('test no numeric input at Player2 position', async () => {
    const data = await functions.getValidate("11 3 12 xx");
    expect(data).toBe(false);
});

test('test number of arguments more than 4 - 11 3 12 5 9', async () => {
    const data = await functions.getValidate("11 3 12 5 9");
    expect(data).toBe(false);
});

test('test number of arguments less than 4 - 11 3 12', async () => {
    const data = await functions.getValidate("11 3 12");
    expect(data).toBe(false);
});

test('test overlap during the start of the game - 11 8 6 3', async () => {
    const data = await functions.getValidate("11 8 6 3");
    expect(data).toBe(false);
});

test(`test player one position with in the range ${constants.LADDER_SIZE}`, async () => {
    const data = await functions.getValidate("11 11 6 3");
    expect(data).toBe(false);
});

test(`test player two position with in the range ${constants.LADDER_SIZE}`, async () => {
    const data = await functions.getValidate("11 4 6 30");
    expect(data).toBe(false);
});

test(`test  both player positions with in the range ${constants.LADDER_SIZE - 1}`, async () => {
    const data = await functions.getValidate("11 4 6 30");
    expect(data).toBe(false);
});

test(`test  both player positions with in the range of ${constants.LADDER_SIZE - 1}`, async () => {
    const data = await functions.getValidate("11 4 6 30");
    expect(data).toBe(false);
});

test(`test  both player positions with in the range of ${constants.LADDER_SIZE - 1} `, async () => {
    const data = await functions.getValidate("11 4 6 30");
    expect(data).toBe(false);
});

test(`test  both player positions with in the range of ${constants.LADDER_SIZE - 1}`, async () => {
    const data = await functions.getValidate("11 4 6 30");
    expect(data).toBe(false);
});

test(`test player one age is minus 11 4 6 30`, async () => {
    const data = await functions.getValidate("-11 4 6 30");
    expect(data).toBe(false);
});

test(`test player two age is minus 11 4 6 30`, async () => {
    const data = await functions.getValidate("11 4 -6 6");
    expect(data).toBe(false);
});

test(`test both player two age is minus 11 4 6 30`, async () => {
    const data = await functions.getValidate("-11 4 -6 6");
    expect(data).toBe(false);
});

// end of validation for bad data input

test(`test input data with random spaces`, async () => {
    const data = await functions.getValidate("11    2   6  8  ");
    expect(data).toStrictEqual(output);
});

test(`test valid data as input`, async () => {
    const data = await functions.getValidate("11 2 6 8");
    expect(data).toStrictEqual(output);
});

test(`test flip players and positions - valid data as input`, async () => {
    const data = await functions.getValidate("6 8 11 2");
    expect(data).toStrictEqual(flipped);
});

test('test ladder size implemented', () => {
    expect(constants.LADDER_SIZE).toBeGreaterThan(1);
});

test('test validate constants.LADDER_SIZE', () => {
    expect(constants.LADDER_SIZE).not.toBeNull();
    expect(constants.LADDER_SIZE).toBeDefined();
    expect(constants.LADDER_SIZE).not.toBeUndefined();
    expect(constants.LADDER_SIZE).toBeGreaterThan(3);
  });

// // test prompt


describe('test user input', () => {

   
});


// describe('Module test', () => {
//     test('user input', async () => {
      
//       jest.fn().mockResolvedValue({ email: 'some@example.com' });
//       expect.assertions(1);
//       const data = await functions.getPrompt(constants.TEST_TOTALS);
//       await expect(data).resolves.toEqual({ email: 'some@example.com' });
//     });
//   });


// // test(`test input prompt for number of test cases`, async () => {
// //     const data = await functions.getPrompt(constants.TEST_TOTALS);
// //     expect(data).toBeGreaterThan(0);
// // });