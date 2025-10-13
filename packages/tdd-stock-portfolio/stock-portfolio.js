class Portfolio{
    constructor() {
        this.stocks = {};
    }

    get size() {
        return Object.keys(this.stocks).length;
    }

    isEmpty() {
        return this.size === 0;
    }

    buy(symbol, quantity) {
        if (symbol in this.stocks) {
            this.stocks[symbol] += quantity;
        } else {
            this.stocks[symbol] = quantity
        }
    }

    sell(symbol, quantity) {
        if (symbol in this.stocks) {
            if (quantity > this.stocks[symbol]) {
                throw "You can't sell more than you have, silly"
            } else if (quantity === this.stocks[symbol]) {
                delete this.stocks[symbol];
            } else {
                this.stocks[symbol] -= quantity;
            }
        } else {
            throw "You don't own this stock";
        }
    }

    uniqueSymbols() {
        return this.size;
    }

    sharesPerSymbol(symbol) {
        if (symbol in this.stocks) {
            return this.stocks[symbol];
        } else {
            return 0;
        }
    }
}

module.exports = Portfolio;
