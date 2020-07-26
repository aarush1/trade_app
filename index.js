//trade app
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');

const path = require('path');

const PORT = process.env.PORT || 5000;

//set handele bars

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "this is other stuff";

//set handlebars routes
app.get('/', function (req, res) {
    res.render('home',{
        stuff: otherstuff
    });
});

// set static folder

app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT,() => console.log("listening"));

