import {Relation} from './Relation';

export class RelationList extends Relation {
  constructor(relationName:string) {
    super(relationName);
    this.relationType= "toMany";
  }
}
