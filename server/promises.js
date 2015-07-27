// With Callbacks
var action = function (cb) {
    setTimeout(function () {
        cb('this is a callback');
    }, 5000)
};
action(function (text) {
    console.log(text);
});


// With promises
var action = function (cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('this is a promise');
        }, 5000)

        reject(new Error("este es un error"));
    })
};
action()
    .then(function (word) {
        console.log(word);
    })
    .catch(function (err) {
        console.err(err)
    })

// Example or readfile using promises
var fs = require('fs');
var readFile = function () {
    return new Promise(function (resolve, reject) {
        fs.readFle('./package.json', function (err, file) {
            if(err){
                reject(err);
            }else{
                resolve(file.toString());
            }
        })
    })
};
readFile()
    .then(function (file) {
        console.log(file);
    })
    .catch(function (err) {
        console.log(err);
    })
    .finally(function () {
       //
    });

// chaining and error handler
reaFile()
    .then(logFile)
    .then(sendEmail, function (err) {
        // this promise has a custom error handler
    })
    .then(callHome)
    .catch(function () {
        // catch error of all the errors
    });

//
var readAllFiles = function () {
    var promises = [readFile(), readFile(), readFile()];
    // wait all to finish
    return Promise.all(promises)
}

readAllFiles()
    .then(function (files) {
       console.log(files);
    });