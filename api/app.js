var express     = require('express'),
 path           = require('path'),
 bodyParser     = require('body-parser'),
 app            = module.exports = express();

app.use(bodyParser.json());

require('./routes/availabilities.js')(app);

app.listen(8595);
