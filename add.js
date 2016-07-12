"use strict";

const add = string => {
    if (string == "") return 0;

    var testRe = /(.*)\]\n/g;

    if (!testRe.test(string)) {
        let array = string.match(new RegExp("^//(.+)\\n"));
        if (array) {
            let [{length}, delim] = array;
            string = string.slice(length);
            delim = delim.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            var pattern = new RegExp(delim, "g");
        } else {
            pattern = /[,\n]/g;
        }

    } else {

        var re = /\[(.*?)\]/gmi;
        var m = re.exec(string);
        var delimArray = [];

        while (m !== null) {
            delimArray.push(m[1]);
            string.replace(m[0], "");
            m = re.exec(string);
        }

        var arrayLength = delimArray.length;

        var re1 = /(.*)\n/gmi;
        var arr1 = string.match(re1);
        let [{length}, delim2] = arr1;

        string = string.slice(length);

        for (var i = 0; i < arrayLength; i++) {
            var delim = delimArray[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            var pattern = new RegExp(delim, "g");
            string = string.split(pattern)
                .join();
        }
        pattern = /[,\n]/g;
    }

    let negativeNumbers = [];
    let isNegative = false;

    string = string.split(pattern)
        .map(str => str == "" ? NaN : +str)
        .map(function (str) {
            if (str < 0) {
                isNegative = true;
                negativeNumbers.push(str);
            }
            return str
        });

    if (isNegative) {
        throw new Error('negatives not allowed: ' + negativeNumbers)
    }

    string = string.reduce(function (sum, num) {
        if (num > 1000) {
            return sum;
        } else {
            return sum + num;
        }
    });
    return string;
};

module.exports = add;