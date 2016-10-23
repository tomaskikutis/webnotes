import React, { Component } from 'react';

class NotesList extends Component {
  render() {
    return (
      <ul className="list-group">
				{
					this.props.notes
					.sort(function(a,b){
						return new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn);
					})
					.map(function(note){
						return <li className="list-group-item" key={note.id}>{note.id}: {note.text}</li>;
					})
				}
			</ul>
    );
  }
}

export default NotesList;
