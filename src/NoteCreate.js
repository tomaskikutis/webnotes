import React, { Component } from 'react';
import Routes from './Routes';

class NoteCreate extends Component {
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
    this.props.actions.goToRoute(Routes.home);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" onChange={this.handleChange} value={this.state.noteText} ref="textArea" />
        </div>
        <button className="btn btn-default" type="submit" disabled={this.state.noteText.length < 1}>Add note</button>
      </form>
    );
  }
	componentDidMount(){
		this.refs.textArea.focus(); 
	}
}

export default NoteCreate;
