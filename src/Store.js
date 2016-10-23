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
      goToRoute: this.actionGoToRoute.bind(this),
      goToPreviousRoute: this.actionGoToPreviousRoute.bind(this)
    };

    window.onpopstate  = this.syncPushStateWithApplicationRoute.bind(this);
  }
  syncPushStateWithApplicationRoute(){
    var path = window.location.pathname.slice(1, window.location.pathname.length);
    var route = path.indexOf("/") === -1 ? path : path.slice(0, path.indexOf("/"));
    this.actionGoToRoute(route);
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
  render() {
    return <this.props.App state={this.state} actions={this.actions} />;
  }
  componentDidMount(){
    this.syncPushStateWithApplicationRoute();
  }
}

export default Store;
