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
						return (
							<li className="list-group-item clearfix" key={note.id}>
								{note.id}: {note.text}
								<button type="button" className="btn btn-default pull-right" aria-label="Edit note">
									<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
								</button>
							</li>
						);
					})
				}
			</ul>
    );
  }
}

export default NotesList;
