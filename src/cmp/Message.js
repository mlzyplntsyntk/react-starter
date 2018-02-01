var React = require('react');

class Message extends React.Component {
  onHover(e) {
    e.target.style.backgroundColor="#ccc";
  }
  onOut(e) {
    e.target.style.backgroundColor="initial";
  }
	render() {
    return (
      <div onMouseOver={this.onHover.bind(this)} onMouseOut={this.onOut.bind(this)}>{this.props.object.content}</div>
    )
	}
}
module.exports = Message;
