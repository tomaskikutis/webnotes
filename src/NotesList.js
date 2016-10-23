import React, { Component } from 'react';
import Routes from './Routes';
import './NotesList.css';

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
								<div className="x-single-line">{note.text}</div>
								<button onClick={function(){this.props.actions.goToRoute(Routes.editNote + "/" + note.id)}.bind(this)} type="button" className="btn btn-default pull-right" aria-label="Edit note">
									<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
								</button>
							</li>
						);
					}.bind(this))
				}
			</ul>
    );
  }
}

export default NotesList;
