import React, { Component } from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import axios from 'axios'
import JSONPretty from 'react-json-pretty';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
  }
  readSheet = (e) => {
    e.preventDefault();
    axios.get('https://sheet.best/api/sheets/e93f28d3-ea08-4ffc-9be5-3e1649ab0899', this.state)
    .then(response => {
      this.setState({body:JSON.stringify(response.data)})
    })
  }
  writeSheet = (e) => {
		e.preventDefault();
		const objt = { id: "1", name: "name1" };
		axios
			.post(
				'https://sheet.best/api/sheets/e93f28d3-ea08-4ffc-9be5-3e1649ab0899',
				objt
			)
			.then((response) => {
				this.readSheet(e);
			});
	};
  render() {
    return (
      <Container fluid className="container">
        <li><a href="https://sheet.best/api/sheets/e93f28d3-ea08-4ffc-9be5-3e1649ab0899">api</a></li>
        <li><a HREF="https://docs.google.com/spreadsheets/u/5/d/1JzMBoh2OBSBVA8ilLwe8msvQqy8kXZPTSQ9Hu2u4LRU/edit?usp=drive_web&ouid=115181280287837127672">doc</a></li>
        <Header as='h2'>App</Header>
        <Button onClick={this.readSheet}>Read</Button>
        <Button onClick={this.writeSheet}>Write</Button>
        <JSONPretty id="json-pretty" data={this.state.body}></JSONPretty>
      </Container>
    )
  }
}
