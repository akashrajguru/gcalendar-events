const expect = require('expect');
const events = require("../index").Events;
const secrets = require('../example/config/secrets');
describe('Google Calendar Events',() => {
    it("Should throw Error 'Please add a calendar ID'",()=>{
        let param = {
            q: ' ',
            singleEvents: true,
            timeMin: '2018-03-16T10:13:57+00:00',
            timeMax: '2018-04-15T09:13:57+00:00',
            apiKey: secrets.apiKey,
            calendarId: ''
        };
        
        expect(()=>{
            events.getCalendarEvents(param)
        }).toThrow('Please add a calendar ID');

    });

    it("Should throw Error 'Please add an API Key'", () => {
        let param = {
            q: ' ',
            singleEvents: true,
            timeMin: '2018-03-16T10:13:57+00:00',
            timeMax: '2018-04-15T09:13:57+00:00',
            apiKey: '',
            calendarId: secrets.calendarId
        };

        expect(() => {
            events.getCalendarEvents(param)
        }).toThrow('Please add an API Key');

    });

    it("Should throw Error 'Request failed with status code 400'", (done) => {
        let param = {
            q: ' ',
            singleEvents: true,
            timeMin: '2018-03-16T10:13:57+00:00',
            timeMax: '2018-04-15T09:13:57+00:00',
            apiKey: 'AIzaSyDp5essIlfg41Whzx4y450f8Pzyd_3nzJM123',
            calendarId: secrets.calendarId
        };

        expect(() => {
            events.getCalendarEvents(param);
        }).toThrow();
        done();
    });

});