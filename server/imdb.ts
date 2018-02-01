import db from './db';

const shortid = require('shortid');

export default class imdb extends db {

  data:{} = {};

  constructor() {
    super();
    this.mockData();
  }

  async mockData() {
    let user = await this.create("user", {name:"Emre"});
    let messages = [
      await this.create("message", {
        content: "Test1",
        createdAt: new Date(),
        user: user.id
      }),
      await this.create("message", {
        content: "Test 2",
        createdAt: new Date(),
        user: user.id
      })
    ];

    let user2 = await this.create("user", {name:"Drago"});
    await this.create("message", {
      content: "Drago's message",
      createdAt: new Date(),
      user: user2.id
    })
  }

  async create(name:string, parameters:any):Promise<any> {
    parameters.id = shortid.generate();
    var t = this;
    return new Promise<any>((resolve, reject)=>{
      if (!this.data[name]) {
        this.data[name] = [];
      }
      this.data[name].push(parameters);
      resolve(parameters);
    });
  }

  //implementing read operation based on given filter, order, limit

  async read(name:string, condition:any):Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (!this.data[name]) {
        resolve({});
        return;
      }

      if (!condition || !condition.filter) {
        resolve(this.data[name]);
        return;
      }

      var filteredRows = this.data[name].filter(row=>{
        for (var key in condition.filter) {
          let baseKey = key.replace(name + ".", "");
          let filterValue = condition.filter[key];

          // omit check for non-existent keys
          if (!row[baseKey]) {
            continue;
          }

          // like query
          if (filterValue.indexOf("%") !== -1 && row[baseKey].indexOf(filterValue.replace(/%/g, '')) !== -1) {
            continue;
          }

          // equality
          if (filterValue !== row[baseKey]) {
            return false;
          }
          // todo implement greater and less than filters
        }
        return true;
      })
      resolve(filteredRows);
    });
  }



  async update(name:string, parameters:any, condition:any):Promise<any> {

  }

  async delete(name:string, condition:any):Promise<any> {

  }
}
