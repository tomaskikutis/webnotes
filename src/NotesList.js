import React, { Component } from 'react';
import Routes from './Routes';
import './NotesList.css';

class NotesList extends Component {
  render() {
    return (
      <div className="x-escape-container">
				{
					this.props.notes
					.sort(function(a,b){
						return new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn);
					})
					.map(function(note){
						return (
							<button
								key={note.id}
								onClick={function(){this.props.actions.goToRoute(Routes.viewNote + "/" + note.id)}.bind(this)}
								type="button"
								className="x-single-line">
								{note.text}
							</button>
						);
					}.bind(this))
				}
			</div>
    );
  }
}

export default NotesList;
