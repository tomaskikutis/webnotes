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
        <div className="form-group">
          <textarea className="form-control" onChange={this.handleChange} value={this.state.noteText} />
          <button className="btn btn-default" type="submit">add note</button>
        </div>
      </form>
    );
  }
}

export default CreateNote;
