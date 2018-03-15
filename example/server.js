const express           = require('express');
const secrets           = require('./config/secrets');
const gcalendarevents   = require('../lib/gcalendarevents');
const port = 3010;
const TIMEZONE = '+00:00';

var app = express();

app.get('/events',(req, res)=>{

    var currentDate = new Date().toISOString().replace(/\..+/, TIMEZONE);
    var nextMonthDate = new Date();
    nextMonthDate.setDate(nextMonthDate.getDate() + 30);
    var endDateTime = nextMonthDate.toISOString().replace(/\..+/, TIMEZONE);
    console.log('currentDate    : ', currentDate);
    console.log('endDateTime    : ', endDateTime);

    let param = {
        q: ' ',
        singleEvents: true,
        timeMin: currentDate,
        timeMax: endDateTime,
        apiKey: secrets.apiKey,
        calendarId: secrets.calendarId
    };
    gcalendarevents.getCalendarEvents(param).then(events => {
        return res.json(events);
    });
});


app.listen(port, ()=>{
    console.log('GCalendar Events example server runnig on port 3010')
})

