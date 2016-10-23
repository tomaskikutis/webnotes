import React, { Component } from 'react';

class NotesList extends Component {
  render() {
    return (
      <ul>
				{
					this.props.notes.map(function(note){
						return <li key={note.id}>{note.id}: {note.text}</li>;
					})
				}
			</ul>
    );
  }
}

export default NotesList;
