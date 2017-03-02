# Currency

## How to
* Clone this repo
* cd into directory, and run `npm install`

## API URL
__URL__
`localhost:8888/api/0.1/` if running locally,
or
`example.com:8888/api/0.1` if hosted.

##How to use the API

POST JSON to the above URL:

`{
	"base": "CAD",
	"amount": 10,
	"symbol": ["USD", "EUR"]
}`

or

`{
	"base": "USD",
	"amount": 10,
	"symbol": "EUR"
}`

or to get historical data

`{
	"base": "CAD", 
	"amount": 10, 
	"symbol": ["USD", "EUR"], 
	"date": "1985-03-15" 
}`

###Details

* "base" is the currency you wish to convert from. __REQUIRED__
* "amount" is the amount to convert. __REQUIRED__
* "symbol" is a string or array containing the currencies you wish to convert to. __REQUIRED__
* "date" is the date you wish to require about. Leave blank for latest rates. __OPTIONAL__

### Note

`https://api.fixer.io/` seems to have an issue with dates before the year 2000.

