var express = require('express');
var app = express();
var server = require('http').createServer(app);
var moment = require('moment');

var commonUtils = (function() {

    var formatOracleDate = function() {
        
        return moment().format('DD/MMM/YY');
    }

    var formatOracleDate2 = function(val) {
        
        return val ? moment(val).format('DD/MMM/YY') : moment().format('DD/MMM/YY');
    }

    // format to mySQL datetime
    var formatMySqlDate = function(val) {
        return val ? moment(val).format('YYYY-MM-DD') : val;
    }

    var formatOrGetTodayMySqlDate = function(val) {
        
        return val ? moment(val).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    }

     // Format date end of day
     var formatDateStart = function(val) {
        return val ? moment(val).format('YYYY-MM-DD 00:00:00') : val;
    }

    // Format date end of day
    var formatDateEnd = function(val) {
        return val ? moment(val).format('YYYY-MM-DD 23:59:59') : val;
    }

    var formatDateShort = function(val) {
        return val ? moment(val).format('YYYY-MM-DD') : val;
    }

    var formatDateToBurkina = function (val) {
        return val ? moment(val).format('DD/MM/YYYY') : val;
    }
    return {
        formatOracleDate: formatOracleDate,
        formatOracleDate2: formatOracleDate2,
        formatMySqlDate: formatMySqlDate,
        formatOrGetTodayMySqlDate: formatOrGetTodayMySqlDate,
        formatDateStart: formatDateStart,
        formatDateEnd: formatDateEnd,
        formatDateShort: formatDateShort,
        formatDateToBurkina: formatDateToBurkina,

    }

})()


module.exports = commonUtils;