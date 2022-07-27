module.exports = Object.freeze({
    LADDER_SIZE: 11,
    TEST_TOTALS: [
        {
            name: 'numberOfTestCases',
            required: true,
            validator: /^([1-9])$/,
            warning: 'Number of cases should be only between 1-9',
            description: 'Enter number of test cases: ',
        }
    ],
    INPUT_PROPS: [
        {
            name: 'inputPattern',
            required: true,
            warning: 'Invalid input data',
            description: 'Please enter the game code: ',

        }
    ]
});