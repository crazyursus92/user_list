import React, {Component} from "react";
import $ from "jquery";
import UserToolbar from './UserToolbar';
import {Link} from 'react-router-dom';
import UserControls from './UserControls';
import userModel from './../model/UserModel';


export default class UserList extends Component{
	constructor (route_data){
		super();

		this.state = {
			users: [],
			count: 0,
			page: 1
		};

		this.limit = 10;

		if(route_data.match.params.page){
			this.state.page = +route_data.match.params.page;
		}
		this._current_state_page = this.state.page;
		userModel.on('users-update', this._updateList.bind(this));
		this._updateList();
	}
	_updateList (){
		userModel.getList((this.state.page - 1) * this.limit).then((data) => {
			this.setState({
				users: data.users,
				count: +data.count
			});
		});
	}
	_pager(){
		let pages = Math.ceil(this.state.count/this.limit);
		let pages_array = [];
		for(let i = 1; i <= pages; i++){
			pages_array.push(i);
		}
		return pages_array;
	}

	componentDidUpdate(){
		if(this._current_state_page !== this.state.page){
			this._current_state_page = this.state.page;
			this._updateList();
		}
	}
	_changePage(e){
		e.preventDefault();
		let page = $(e.target).parent('li').data('page');
		this.setState({
			page: page
		});
		this.props.history.push('/list/' + page);

	}
	render(){
		return (
			<div>
				<UserToolbar/>
				<div className="col-md-offset-2 col-md-8">
				<table className="table table-bordered">
					<tbody>
					{ this.state.users.map((user, index)=>{
						return (
							<tr data-id={user.id} key={index}>
								<td>
									{user.first_name} {user.last_name} ({user.username})
								</td>
								<td>
									<UserControls id={user.id}/>
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
					<nav aria-label="Page navigation" className="text-center">
						<ul className="pagination">
							{
								this._pager().map((page) => {
									return (
										<li data-page={page} className={ page === this.state.page ? 'active' : ''} key={page}><Link to={"/list/" + page} onClick={this._changePage.bind(this)} replace={true}>{page}</Link></li>
									)
								})}
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}