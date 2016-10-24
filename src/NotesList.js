import React, { Component } from 'react';
import Routes from './Routes';
import SortingOptions from './SortingOptions';
import './NotesList.css';

class NotesList extends Component {
	getSortingOptionLabel(key){
		switch(key){
			case SortingOptions.dateCreatedAsc:
				return "Date created (oldest first)";
			case SortingOptions.dateCreatedDesc:
				return "Date created (newest first)";
			case SortingOptions.dateUpdatedAsc:
				return "Date updated (oldest first)";
			case SortingOptions.dateUpdatedDesc:
				return "Date updated (newest first)";
			default:
				return "Sorting unspecified";
		}
	}
  render() {
    return (
			<div>
				<div className="form-group">
					<label htmlFor="sorting-options">Sort by</label>
					<select value={this.props.state.sortBy} id="sorting-options" onChange={function(event){this.props.actions.actionUpdateSortingOrder(event.target.value)}.bind(this)} className="form-control">
						{
							Object.keys(SortingOptions).map(function(key){
								return <option key={key} value={key}>{this.getSortingOptionLabel(key)}</option>;
							}.bind(this))
						}
					</select>
				</div>

				<div className="x-escape-container">
					{
						this.props.state.notes
						.sort(function(a,b){
							switch(this.props.state.sortBy){
								case SortingOptions.dateUpdatedAsc:
									return new Date(a.lastUpdatedOn) - new Date(b.lastUpdatedOn);
								case SortingOptions.dateUpdatedDesc:
									return new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn);
								case SortingOptions.dateCreatedAsc:
									return new Date(a.createdOn) - new Date(b.createdOn);
								case SortingOptions.dateCreatedDesc:
									return new Date(b.createdOn) - new Date(a.createdOn);
								default:
									return new Date(b.createdOn) - new Date(a.createdOn);
							}
						}.bind(this))
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
			</div>
    );
  }
}

export default NotesList;
