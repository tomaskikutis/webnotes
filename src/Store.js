import React, { Component } from 'react';
import Routes from './Routes';

const localStorageStateKey = 'state';

class Store extends Component {
  constructor(props) {
    super(props);

    var savedState = localStorage.getItem(localStorageStateKey);

    this.state = savedState !== null ? JSON.parse(savedState) : {
      notesLastId: 0,
      notes: [],
      currentRoute: Routes.home
    };

    this.actions = {
      createNote: this.actionCreateNote.bind(this),
      editNote: this.actionEditNote.bind(this),
      deleteNote: this.actionDeleteNote.bind(this),
      goToRoute: this.actionGoToRoute.bind(this),
      goToPreviousRoute: this.actionGoToPreviousRoute.bind(this)
    };

    window.onpopstate  = this.syncPushStateWithApplicationRoute.bind(this);
  }
  syncPushStateWithApplicationRoute(){
    var path = window.location.pathname.slice(1, window.location.pathname.length);
    this.actionGoToRoute(path);
  }
  setStateAndPersist(nextState){
    this.setState(nextState, this.persistState);
  }
  persistState(){
    localStorage.setItem(localStorageStateKey, JSON.stringify(this.state));
    history.pushState({}, document.title, "/" + this.state.currentRoute);
  }
  actionGoToRoute(nextRoute){
    if(this.state.currentRoute === nextRoute){
      return;
    }
    this.setStateAndPersist({
      currentRoute: nextRoute
    });
  }
  actionGoToPreviousRoute(){
    history.back();
  }
  actionCreateNote(text){
    this.setStateAndPersist({
      notes: this.state.notes.concat({
        id: ++this.state.notesLastId,
        text: text,
        lastUpdatedOn: new Date().toISOString()
      })
    });
  }
  actionEditNote(noteId, nextText){
    this.setStateAndPersist({
      notes: this.state.notes.map(function(note){
        if(note.id === noteId){
          note.text = nextText;
        }
        return note;
      })
    });
  }
  actionDeleteNote(noteId){
    this.setStateAndPersist({
      notes: this.state.notes.filter(function(note){
        return note.id !== noteId;
      })
    });
  }
  render() {
    return <this.props.App state={this.state} actions={this.actions} />;
  }
  componentDidMount(){
    this.syncPushStateWithApplicationRoute();
  }
}

export default Store;
