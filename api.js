const isValidDate = require('./validDate');
const rest = require('restler');

const self = module.exports = {

    ver002: (data, res) => {

        if (typeof data.base === 'undefined' || data.base === '') {
            self.sendResponse(res, 403, 'Please supply a base currency symbol');
            return;
        }

         base = data.base.toUpperCase();

        const url = 'https://api.fixer.io/latest?symbols=' + data.symbol.from + ',' + data.symbol.to;

        if (typeof data.symbol === 'undefined' || data.symbol === '') {
            self.sendResponse(res, 403, 'Please supply a currency symbol to convert to');
            return;
        }

        if (typeof data.amount === 'undefined' || data.amount === '') {
            self.sendResponse(res, 403, 'Please supply an amount to convert');
            return;
        }

        if (typeof data.symbol === 'object') {

            let str = '';
            var symbolArray = data.symbol;

            for (let i = symbolArray.length - 1; i >= 0; i--) {
                str += symbolArray[i].toUpperCase() + ',';
            }

            const symbols = str;

        } else {

            const symbols = data.symbol.toUpperCase();

        }

        if (typeof data.date !== 'undefined') {
            if (typeof data.date !== 'string') {
                self.sendResponse(res, 403, 'Please provide the date as a string');
                return;
            }
            // Validate Date
            if (isValidDate(data.date)) {
                var date = data.date
            } else {
                self.sendResponse(res, 403, 'Please provide a valid date in YY-MM-DD format');
                return;
            }
        } else {
            let date = 'latest';
        }

        const url = 'http://api.fixer.io/' + date + '?base=' + base + '&symbols=' + symbols;

        rest.get(url).on('complete', function(err, response) {

            if (response.statusCode == 200) {

                let returns = {
                    base: data.base,
                    amount: data.amount,
                    results: self.convertAmount(data.amount, JSON.parse(response.rawEncoded)),
                    dated: data.date
                };

                self.sendResponse(res, 200, returns);
            }
            if (response.statusCode == 401) {
                callback('Not Authorized');
            }
            if (response.statusCode == 502) {
                callback('API Error');
            }

        });

    },

    convertAmount: (amount, data) => {

        const rates = data.rates;
        let returns = [];

        for (let r in rates) {

            if (rates.hasOwnProperty(r)) {

                let convert = (amount * rates[r]);
                returns.push({from: data.base, to: r, roundedResult: convert.toFixed(2), fullResult: convert, rate: rates[r]})

            }

        }

        return returns;
    },

    sendResponse: (res, status, response) => {

        if (typeof response === 'object') {
            response = JSON.stringify(response);
        }
        res.status(status);
        res.write(response);
        res.end();
        return;

    }
}
