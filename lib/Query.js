var React = require('react');
var Cache = require('./Cache');

// i should provide this schema to my Query component via an environment
// configuration, for demonstration purposes, skipping that implementation.

var schema = require('../spec/schema');

class Query extends React.Component {

  parseRecursive(typeName:string) {
    var nested = {};
    for (var key in schema[typeName]) {
      let field = schema[typeName][key];

      let obj = {
        typeName: field.typeName
      };

      if (field.typeName === 'relation') {
        obj.relationType = field.relationType;
        obj.relationName = field.relationName;
      }

      nested[key] = obj;
    }
    return nested;
  }

  parseQuery() {
    const typeName = this.props.type;
    const parameters = this.props.parameters || {};
    let nestedQuery = this.parseRecursive(typeName);
    let obj = {};
    obj[typeName] = {
      query: nestedQuery,
      param: parameters
    };
    return obj;
  }

  // https://stackoverflow.com/questions/8431651/getting-a-diff-of-two-json-objects
  // not used
  deepCompare(obj1, obj2) {
    var result = {};
    for(var key in obj1) {
      if(obj2[key] != obj1[key]) result[key] = obj2[key];
      if(typeof obj2[key] == 'array' && typeof obj1[key] == 'array')
        result[key] = this.deepCompare(obj1[key], obj2[key]);
      if(typeof obj2[key] == 'object' && typeof obj1[key] == 'object')
        result[key] = this.deepCompare(obj1[key], obj2[key]);
    }
    return result;
  }

  componentWillUpdate(nextProps, nextState) {
    // we just need to send remote requests if parameters
    // property on our Component has changed explicitly.

    if (this.props.parameters !== nextProps.parameters) {
      // remote interval is used for making requests to our
      // server if we have setup an interval before, we need to
      // clear it first to prevent multiple requests

      if (this.remoteInterval) {
        clearTimeout(this.remoteInterval);
      }

      // setup the new interval, introducing 0.3 secs before

      this.remoteInterval=setTimeout(()=>{
        this.remoteFetch();
      }, 300);
    }
  }

  fetchResult(props, error) {
    this.setState({
      executed: this.props.result.call(this, props, error)
    });
  }

  remoteFetch() {
    let query = this.parseQuery();

    Cache.read(this.props.type, this.props.parameters);

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

  componentWillMount() {
    this.remoteFetch();
    this.setState({
      executed: this.props.result.call(this, null,null)
    });
  }

  render() {
    return(
      this.state.executed
    )
  }
}

module.exports = Query;
