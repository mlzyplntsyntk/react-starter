var React = require('react');
var ReactDOM = require('react-dom');
var schema = require('../spec/schema')

import Query from '../lib/Query';
import Message from './cmp/Message';

class App extends React.Component {

	componentWillMount() {
		this.setState({
			search: "",
			user: ""
		})
	}

	handleSearchChange(e) {
		this.setState({
			search: e.target.value
		})
	}

	handleMessageKeyPress(e) {
		if (e.key !== 'Enter') return;
		// if user pressed Enter key, use Cache library to
		// send new record payload to server
	}

	handleUserChange(e) {
		this.setState({
			user: e.target.value
		})
	}

	render() {

		return (
			<div>

				<Query
					// getting users from database
					type="user"
					parameters={{}}
					result={(props,error)=>{
						return(
							<select
								onChange={this.handleUserChange.bind(this)}
								value={this.state.user}>

								<option value="">--</option>
								{
									error && <option>{error}</option>
									||
									props && props.map((object, i)=>{
										return (<option key={i} value={object.id}>{object.name}</option>)
									})
									||
									<option>Loading</option>
								}
							</select>
						)
					}}
				/>

				<input
					type="text"
					value={this.state.search}
					placeholder="Search"
					onChange={this.handleSearchChange.bind(this)} />

				<Query
					// passing the name of my structure to query
					type="message"
					// sending default query parameters
					parameters={{
						filter: {
							"message.content": '%'+this.state.search+'%', // this will filter the content
																								// field with like operation
							"message.user": this.state.user
						},
						order: {
							createdAt: 'desc'
						},
						limit: 20
					}}
					// implementing my own renderer logic after getting results
					// like relay, it gets props and error parameters.
					result={(props,error)=>{

						if (error) {
							return <div>error</div>;
						} else if (props) {
							return (
								props.map((object, i)=>{
									return (
										// returning my Message Component with each message returned
										// from server
										<Message object={object} key={i}></Message>
									)
								})
							)
						}
						// initial html object to render
						return <div>loading...</div>
					}}>
				</Query>

				<input
					type="text"
					onKeyPress={this.handleMessageKeyPress.bind(this)} />

			</div>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
