const axios = require('axios');
const _ = require('lodash');


/** Returns a promise that list all events on calendar during selected period
	 *
	 * @param {string} calendarId 					- Calendar identifier
     * @param {string} apiKey                       - API key to authorize your request
     * @param {boolean} singleEvents                - Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves.
	 * @param {datetime} params.timeMin (optional) 	- start datetime of event in 2016-04-29T14:00:00+08:00 RFC3339 format
	 * @param {datetime} params.timeMax (optional) 	- end datetime of event in 2016-04-29T18:00:00+08:00 RFC3339 format
	 * @param {string} params.q (optional) 			- Free text search terms to find events that match these terms in any field, except for extended properties.
	 */
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

    return axios.get(apiUrl)
        .then(res => {
            let events = res.data.items;
            return events;
        })
        .catch(err => {
            let error = {};
            if (err.response.status === 400){
                error.origin = 'getCalendarEvents';
                error.error = 'keyInvalid';
                error.message = 'Invalid API key';
            }else if (err.response.status === 404){
                error.origin = 'getCalendarEvents';
                error.error = 'notFound';
                error.message = 'Calendar Not Found'
            }else{
                error.message = err.message;
            }
        
            //throw new Error(JSON.stringify(error));
            return error;
        });

}

module.exports = { getCalendarEvents };