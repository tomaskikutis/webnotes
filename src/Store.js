import React, { Component } from 'react';
import Routes from './Routes';
import SortingOptions from './SortingOptions';

const localStorageStateKey = 'state';
const baseRoute = process.env.PUBLIC_URL + "/";

class Store extends Component {
  constructor(props) {
    super(props);

    var savedState = localStorage.getItem(localStorageStateKey);

    this.state = savedState !== null ? JSON.parse(savedState) : {
      notesLastId: 0,
      notes: [],
      currentRoute: Routes.home,
      sortBy: SortingOptions.dateUpdatedDesc
    };

    this.actions = {
      createNote: this.actionCreateNote.bind(this),
      editNote: this.actionEditNote.bind(this),
      deleteNote: this.actionDeleteNote.bind(this),
      goToRoute: this.actionGoToRoute.bind(this),
      goToPreviousRoute: this.actionGoToPreviousRoute.bind(this),
      actionUpdateSortingOrder: this.actionUpdateSortingOrder.bind(this)
    };

    window.onpopstate = this.syncPushStateWithApplicationRoute.bind(this, false);
  }
  syncPushStateWithApplicationRoute(updateHistoryPushState){
    this.actionGoToRoute(window.location.pathname, updateHistoryPushState);
  }
  setStateAndPersist(nextState, updateHistoryPushState){
    this.setState(nextState, this.persistState.bind(this, updateHistoryPushState));
  }
  persistState(updateHistoryPushState){
    localStorage.setItem(localStorageStateKey, JSON.stringify(this.state));
    if(updateHistoryPushState !== false){
      history.pushState({}, document.title, baseRoute + this.state.currentRoute);
    }
  }
  actionGoToRoute(nextRoute, updateHistoryPushState){
    if(nextRoute.indexOf(baseRoute) === 0){
      nextRoute = nextRoute.slice(baseRoute.length, nextRoute.length);
    }
    if(nextRoute.indexOf("/") === 0){
      nextRoute = nextRoute.slice("/".length, nextRoute.length);
    }

    if(this.state.currentRoute === nextRoute){
      return;
    }
    this.setStateAndPersist({
      currentRoute: nextRoute
    }, updateHistoryPushState);
  }
  actionGoToPreviousRoute(){
    history.back();
  }
  actionCreateNote(text){
    this.setStateAndPersist({
      notes: this.state.notes.concat({
        id: ++this.state.notesLastId,
        text: text,
        createdOn: new Date().toISOString(),
        lastUpdatedOn: new Date().toISOString()
      })
    });
  }
  actionEditNote(noteId, nextText){
    this.setStateAndPersist({
      notes: this.state.notes.map(function(note){
        if(note.id === noteId){
          note.text = nextText;
          note.lastUpdatedOn = new Date().toISOString();
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
  actionUpdateSortingOrder(nextSortBy){
    this.setStateAndPersist({
      sortBy: nextSortBy
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
