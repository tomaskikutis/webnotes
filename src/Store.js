import React, { Component } from 'react';

const localStorageStateKey = 'state';

class Store extends Component {
  constructor(props) {
    super(props);

    var savedState = localStorage.getItem(localStorageStateKey);

    this.state = savedState !== null ? JSON.parse(savedState) : {
      notesLastId: 0,
      notes: []
    };

    this.actions = {
      createNote: this.actionCreateNote.bind(this)
    };
  }
  setStateAndPersist(nextState){
    this.setState(nextState, this.persistState);
  }
  persistState(){
    localStorage.setItem(localStorageStateKey, JSON.stringify(this.state));
  }
  actionCreateNote(text){
    this.setStateAndPersist({
      notes: this.state.notes.concat({id: ++this.state.notesLastId, text: text})
    });
  }
  render() {
    return <this.props.App notes={this.state.notes} actions={this.actions} />;
  }
}

export default Store;
