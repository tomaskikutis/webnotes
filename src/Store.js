import React, { Component } from 'react';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesLastId: 0,
      notes: []
    };
    this.actions = {
      createNote: this.actionCreateNote.bind(this)
    };
  }
  actionCreateNote(text){
    this.setState({
      notes: this.state.notes.concat({id: ++this.state.notesLastId, text: text})
    });
  }
  render() {
    return <this.props.App notes={this.state.notes} actions={this.actions} />;
  }
}

export default Store;
