const async = require('async');
const _ = require('lodash');
const request = require('request');

function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}

function mergeByProperty(arr1, arr2, prop1, prop2) {
  _.each(arr2, function(arr2obj) {
    var arr1obj = _.find(arr1, function(arr1obj) {
      return arr1obj[prop1] === arr2obj[prop2];
    });

    // if (arr1obj[prop1] && arr1obj[prop1] === 'en') {
      console.log(arr1obj);
    // }

    //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
    arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
  });
}

const urls= [
  'http://data.okfn.org/data/core/language-codes/r/ietf-language-tags.json',
  'http://data.okfn.org/data/core/language-codes/r/language-codes-full.json'
];

async.map(urls, httpGet, function (error, response) {
  if (error) {
    return console.log(error);
  }

  // console.log(response);

  let mergedData = response[0];

  mergeByProperty(mergedData, response[1], 'lang', 'alpha2');

  // console.log('mergedData', mergedData);
});
