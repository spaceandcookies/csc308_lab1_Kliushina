const Portfolio = require('./stock-portfolio');

//2.1
test('portfolio created', () => {
  const portfolio = new Portfolio();
  expect(portfolio.stocks).toEqual({});
});

//2.2
test('portfolio is empty', () => {
  const portfolio = new Portfolio();
  expect(portfolio.isEmpty()).toBe(true);
});

//2.3
test('buying shares adds to portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  expect(portfolio.stocks['NNNN']).toBe(26);
});

test('buying shares adds to portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  portfolio.buy('NNNN', 4);
  expect(portfolio.stocks['NNNN']).toBe(30);
});

//2.4
test('selling shares removes from portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  portfolio.sell('NNNN', 10);
  expect(portfolio.stocks['NNNN']).toBe(16);
});

//2.5
test('number of unique symbols in the portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 4);
  portfolio.buy('GMR', 10);
  expect(portfolio.uniqueSymbols()).toBe(2);
});

//2.6
test('selling all shares removes symbol from portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  portfolio.sell('NNNN', 26);
  expect(portfolio.stocks['NNNN']).toBeUndefined;
});

//2.7
test('number of shares per symbol', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  portfolio.buy('AAPL', 14);
  expect(portfolio.sharesPerSymbol('NNNN')).toBe(26);
});

test('number of shares per symbol', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  portfolio.buy('AAPL', 14);
  expect(portfolio.sharesPerSymbol('RBLX')).toBe(0);
});

//2.8
test('overselling shares from portfolio', () => {
  const portfolio = new Portfolio();
  portfolio.buy('NNNN', 26);
  expect(() => portfolio.sell('NNNN', 27)).toThrow("You can't sell more than you have, silly");
});

test('selling shares person does not own', () => {
  const portfolio = new Portfolio();
      expect(() => portfolio.sell('NNNN', 1)).toThrow("You don't own this stock");
});

// I was mostly able to follow the test-first approach. When I code I often tend to think of all
// the possible niche cases that can happen so I wrote code for a few cases before I was even asked 
// to test for them like in 2.8 and 2.6 - I already had the implementation for them. I am also syntax-challanged
// so sometimes my tests continued to fail even when I gave correct implementation because I'd miss a semicolon 
// or a parenthesis in the test (but that's my problem, not this approach's problem). Overall though I do like 
// this approach - it's straight forward and does a good job highlighting what needs to be done first and the order 
// of significance when organizing the code.