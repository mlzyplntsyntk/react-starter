import db from './db';

// now here is my query language abstraction
// this class is responsible to translate all messages coming from client
export default class ql {
  db:db;

  constructor(db:db) {
    this.db = db;
  }

  async empty():Promise<any> {
    return new Promise((resolve,reject) => {
      resolve({});
    })
  }

  public async query(payload:any):Promise<any> {
    if (!payload) {
      return this.empty();
    }

    let typeName;

    for (var a in payload) {
      typeName = a;
    }

    if (!typeName) {
      return this.empty();
    }

    return this.db.read(typeName, payload[typeName].param);
  }
}
