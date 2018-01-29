const https = require("https");
const url = "https://apiv2.bitcoinaverage.com/exchanges/ticker/";

var exchanges = ["BITTREX","BINANCE", "BITFINEX", "POLONIEX" ];

// This script uses the Free API from https://apiv2.bitcoinaverage.com to generate text files 
// that can then be imported into TradingView as watchlists

var callback = function(res) 
{
    res.setEncoding("utf8");
	let body = "";
	res.on("data", data => 
	{
	  	body += data;
	});

	res.on("end", () => 
	{
		body = JSON.parse(body);

		var pairArray = [];
		for (var key in body.symbols) 
		{
		    if (body.symbols.hasOwnProperty(key)) 
		    {
		        pairArray.push(key);
		    }
		}
		pairArray.sort();
		pairString = "";

		for(var j = 0; j < pairArray.length;j++)
		{
			var exchangeName = this.exchange;
		 	pairString += exchangeName+":"+pairArray[j]+"\n";
		}

		var fs = require('fs');
		var filename = this.exchange+".txt";

		fs.writeFile(filename, pairString, function(err) 
		{
	   		if(err) 
	   		{
	        	return console.log(err);
	    	}
	    	console.log("The file was saved!");
		});
	});
}

for(var i = 0; i < exchanges.length;i++)
{
	var exchangeUrl = url + exchanges[i].toLowerCase();
	https.get(exchangeUrl, callback.bind( {exchange: exchanges[i]} ));
}	




