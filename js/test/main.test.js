const roundNumber = require('../main.js');

test('rounds 1.9 up to be 2', () => {
    expect(roundNumber(1.9)).toBe(2);
});
test('rounds 1.1 down to be 1', () => {
    expect(roundNumber(1.1)).toBe(1);
});
test('rounds 99.5 up to be 100', () => {
    expect(roundNumber(99.5)).toBe(100);
});
test('rounds 0.2 up to be 0', () => {
    expect(roundNumber(0.2)).toBe(0);
});
