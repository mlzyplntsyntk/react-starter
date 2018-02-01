// these types could be imported from a single file in the future

import {String} from '../lib/Types/String'
import {Date} from '../lib/Types/Date'
import {Relation} from '../lib/Types/Relation'
import {RelationList} from '../lib/Types/RelationList'

// this class will expose my schema
// each key:value pair represents a single entity.
module.exports = {
  // user entity
  user:{
    name: new String(),
    friends: new RelationList("user")
  },
  // tags for messages
  tag: {
    title: new String()
  },
  // message entity
  message : {
    content: new String(),
    createdAt: new Date(),
    // one to one relation
    user: new Relation("user"),
    // one to many relation (just for sample)
    tags: new RelationList("tag")
  }
}
