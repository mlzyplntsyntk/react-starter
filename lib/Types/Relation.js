import {Type} from '../Type';

export class Relation extends Type {
  constructor(relationName:string) {
    super({
      typeName: "relation",
      relationName: relationName,
      relationType: "toOne"
    })
  }
}
