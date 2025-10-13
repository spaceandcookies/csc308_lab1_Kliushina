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