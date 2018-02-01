import React from 'react';

var data = {};

var fetchRemote = function() {
  fetch(
    "http://localhost:8090/", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(a=>{
    return a.json()
  }).then(results=>{
    this.fetchResult(results, null);
  }).catch(e=>{
    this.fetchResult(null, e.message);
  }).finally(()=>{
    this.remoteInterval = null;
  })
}

module.exports = {
  read(typeName, parameters, callback) {
    data[typeName] = parameters;
    
  }
};
