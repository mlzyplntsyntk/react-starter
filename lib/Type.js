// Type Component will be a message to my QL server to communicate.

export class Type {
  constructor(props) {
    for (var a in props) {
      this[a] = props[a];
    }
    if (!this.typeName)
      this.typeName = "string";
  }
}
