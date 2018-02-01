// abstract db class to provide CRUD operations
export default abstract class db {
  abstract async create(name:string, parameters:any):Promise<any>;
  abstract async read(name:string, condition:any):Promise<any>;
  abstract async update(name:string, parameters:any, condition:any):Promise<any>;
  abstract async delete(name:string, condition:any):Promise<any>;
}
