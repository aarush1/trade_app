//trade app
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;



//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));

//api key pk_1eb1b38f273342cfb3eb243a68aae116
//create call api function

function call_api(finishedAPI,ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_1eb1b38f273342cfb3eb243a68aae116', { json: true }, (err, res, body) => {
  if(err){return console.log(err);}

  if(res.statusCode === 200){
      //console.log(body);

      finishedAPI(body);

  };

});

}
 

//set handele bars

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "this is other stuff";

//set handlebars index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "fb");
		
});

//set handlebars index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//console.log(doneAPI);
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
		
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// set static folder

app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT,() => console.log("listening"));

