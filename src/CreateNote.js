import React, { Component } from 'react';

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({noteText: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.createNote(this.state.noteText);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.noteText} />
        <button type="submit">add note</button>
      </form>
    );
  }
}

export default CreateNote;
