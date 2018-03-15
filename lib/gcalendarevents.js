const axios = require('axios');
const _ = require('lodash');

function getCalendarEvents(param) {
    if (!param.calendarId) {
        throw 'Please add a calendar ID';
    }
    if (!param.apiKey) {
        throw 'Please add an API Key';
    }

    //  Default time range is 15 days from current system time.
    if (!param.timeMin || !param.timeMax) {
        param.timeMin = new Date();
        param.timeMax = new Date();
        timeMax.setDate(timeMax.getDate() + 15);
    }

    const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${param.calendarId}/events?q=${encodeURIComponent(param.q)}&singleEvents=${param.singleEvents}&timeMax=${encodeURIComponent(param.timeMax)}&timeMin=${encodeURIComponent(param.timeMin)}&key=${param.apiKey}`;

    // console.log('URL : ', apiUrl);
    // var model = {};
    // _.forEach(options.whitelist, (val)=>{
    //     model[val]= null;
    // })
    // console.log('Model is :', model);
    return axios.get(apiUrl)
        .then(res => {
            let events = res.data.items;
            return events;
        })
        .catch(err => {
            throw new Error(err.message);
        });

}

module.exports = { getCalendarEvents };