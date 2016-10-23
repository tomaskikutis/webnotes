import React, { Component } from 'react';
import Routes from './Routes';

class NoteEdit extends Component {
  constructor(props) {
    super(props);

    var noteText = "";

    var pathParts = this.props.state.currentRoute.split("/");
    if(pathParts[pathParts.length - 1] !== Routes.editNote){
      try {
        var noteId = parseInt(pathParts[pathParts.length - 1], 10);
        noteText = this.props.state.notes.filter(function(note){
          return note.id === noteId;
        })[0].text;
        this.noteId = noteId;
      }
      catch(e){
        
      }
    }

    this.state = {
      noteText: noteText
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }
  handleChange(event) {
    this.setState({noteText: event.target.value});
  }
  deleteNote(){
    this.props.actions.deleteNote(this.noteId);
    this.props.actions.goToRoute(Routes.notesList);
  }
  handleSubmit(event) {
    event.preventDefault();

    if(this.noteId === undefined){
      this.props.actions.createNote(this.state.noteText);
    }
    else {
      this.props.actions.editNote(this.noteId, this.state.noteText);
    }

    this.props.actions.goToRoute(Routes.notesList);
  }
  render() {
    var deleteNoteButton = this.noteId === undefined ? "" : <span> <button onClick={this.deleteNote.bind(this)} className="btn btn-danger" type="button">Delete note</button></span>;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <textarea className="form-control" onChange={this.handleChange} value={this.state.noteText} />
        </div>
        <button className="btn btn-default" type="submit" disabled={this.state.noteText.length < 1}>{this.noteId === undefined ? "Add note" : "Edit Note"}</button>
        {deleteNoteButton}
      </form>
    );
  }
}

export default NoteEdit;
