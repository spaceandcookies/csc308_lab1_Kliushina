const myFunctions = require('./functions.js');

test('Simple division -- success', () => {
  const target = 5;
  const result = myFunctions.div(10, 2);
  expect(target).toBe(result);
});

test('Dividing large numbers -- success', () => {
  const target = 10000000000;
  const result = myFunctions.div(130000000000, 13);
  expect(target).toBe(result);
});

test('Dividing full numbers -- success', () => {
  const target = 7;
  const result = myFunctions.div(7, 1);
  expect(target).toBe(result);
});

test('Dividing Negative by positive -- success', () => {
  const target = -4;
  const result = myFunctions.div(-4, 1);
  expect(target).toBe(result);
});

test('Diviginf by negative -- success', () => {
  const target = -3;
  const result = myFunctions.div(6, -2);
  expect(target).toBe(result);
});

test('Dividing by zero -- success', () => {
  expect(myFunctions.div(0, 0)).toBeNaN();
});

test('dividing zero by non-zero -- success', () => {
    const target = 0;
    expect(myFunctions.div(0, 5)).toBe(target);
    expect(myFunctions.div(0, -5)).toBe(-target); 
    expect(myFunctions.div(0, 100)).toBe(target);
  });

test('Dividing decimal numbers -- success', () => {
  const target = 0.5;
  const result = myFunctions.div(0.1, 0.2);
  expect(target).toBe(result);
});

test('Dividing very small numbers -- success', () => {
  const target = 1;
  const result = myFunctions.div(0.000001, 0.000001);
  expect(target).toBe(result);
});




test('Testing containsNumbers with numbers -- success', () => {
  expect(myFunctions.containsNumbers('hello123')).toBe(true);
});

test('Testing containsNumbers without numbers -- success', () => {
  expect(myFunctions.containsNumbers('hello')).toBe(false);
});

test('Testing containsNumbers with numbers -- success', () => {
  expect(myFunctions.containsNumbers('hello@123')).toBe(true);
});

test('Testing containsNumbers without numbers with special characters -- success', () => {
  expect(myFunctions.containsNumbers('hello!!')).toBe(false);
});

test('Testing containsNumbers without any text -- success', () => {
  expect(myFunctions.containsNumbers('  ')).toBe(false); //caught the bug! Empty string evaluates to true instead of false
});

test('Testing containsNumbers with text and blank space -- success', () => {
  expect(myFunctions.containsNumbers('hello     ')).toBe(false); //same thing as previous test: blank space counts as number when there isn't one
});

test('Testing containsNumbers with just special characters -- success', () => {
  expect(myFunctions.containsNumbers('&*%$^&*(*&$#%^&*?">:"!!')).toBe(false);
});

test('Testing cases where numbers are in different locations -- success', () => {
expect(myFunctions.containsNumbers('1hello')).toBe(true);
expect(myFunctions.containsNumbers('hello1')).toBe(true);
expect(myFunctions.containsNumbers('he1lo')).toBe(true); 
});