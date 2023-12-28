// create server
var express = require('express');
var app = express();

// mount cors for freeCodeCamp tests
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static assets
app.use(express.static('public'));

// serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// endpoint
app.get("/api/:date?", (req, res) => {
  var dateParam = req.params.date;

  // if date parameter is a valid date
  if (!isNaN(Date.parse(dateParam)) && Date.parse(dateParam) !== "Invalid Date") {
    const msec = Date.parse(dateParam);
    const date = new Date(msec);

    var utcDate = date.toUTCString();
    var unixDate = Math.floor(date.getTime());

    res.json({
      unix: unixDate,
      utc: utcDate
    });
  }
  // if date parameter is a unix time stamp
  else if (new RegExp(/^\d{13}$/).test(dateParam) === true) {
    const timestampAsNumber = parseInt(dateParam, 10);
    const date = new Date(timestampAsNumber);

    var utcDate = date.toUTCString();
    var unixDate = Math.floor(date.getTime());

    res.json({
      unix: unixDate,
      utc: utcDate
    });
  }
  // if date parameter is empty
  else if (dateParam === undefined) {
    const date = new Date();

    var utcDate = date.toUTCString();
    var unixDate = Math.floor(date.getTime());

    res.json({
      unix: unixDate,
      utc: utcDate
    });
  }
  // if date parameter is invalid
  else {
    res.json({
      error: "Invalid Date"
    })
  }
});


// listen for requests :)
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));