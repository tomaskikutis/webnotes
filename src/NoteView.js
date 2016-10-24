import React, { Component } from 'react';
import Routes from './Routes';

class NoteView extends Component {
  constructor(props) {
    super(props);

    var noteText = "";

    var pathParts = this.props.state.currentRoute.split("/");
    if(pathParts[pathParts.length - 1] !== Routes.viewNote){
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
      noteText: noteText,
			noteId: noteId
    };
    this.deleteNote = this.deleteNote.bind(this);
  }
  deleteNote(){
		var confirmation = confirm("Are you sure you want to delete this note ?");
    if(confirmation === true){
      this.props.actions.deleteNote(this.noteId);
    	this.props.actions.goToRoute(Routes.home);
    }
  }
  render() {

    return (
      <div>
				<div className="form-group" style={{wordWrap: "break-word", whiteSpace: "pre-line"}}>{this.state.noteText}</div>

        <button className="btn btn-default" type="submit" onClick={function(){this.props.actions.goToRoute(Routes.editNote + "/" + this.state.noteId)}.bind(this)}>Edit Note</button>
        <span> <button onClick={this.deleteNote.bind(this)} className="btn btn-danger" type="button">Delete note</button></span>
      </div>
    );
  }
}

export default NoteView;
