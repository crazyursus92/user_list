import React, {Component} from "react";
import $ from "jquery";
import UserToolbar from "./UserToolbar";
import {Link} from "react-router-dom";
import UserControls from "./UserControls";
import userModel from "./../model/UserModel";


export default class UserList extends Component {
	constructor(route_data) {
		super();

		this.state = {
			users: [],
			count: 0,
			page: 1
		};

		this.limit = 10;

		if (route_data.match.params.page) {
			this.state.page = +route_data.match.params.page;
		}
		this._page = this.state.page;
		this._updateList = this._updateList.bind(this);



	}
	componentDidMount(){
		this._updateList();
		/**
		 * Event на обнавления списка пользователей (для удаление пользователей)
		 *
		 */
		userModel.on('users-update', this._updateList);
	}
	componentWillUnmount(){
		userModel.off('users-update', this._updateList);
	}
	_updateList(page = null) {
		page = page || this.state.page;
		userModel.getList((page - 1) * this.limit).then((data) => {
			if (data.status === 'success') {
				if (this._validateResponse(data.response)) {
					this.setState({
						users: data.response.users,
						count: +data.response.count
					});
				}
			}
		});
	}

	_validateResponse(data) {
		if(!data.users.length){
			let pages = this._pages(+data.count);
			this.setState({
				page: pages
			});
			this.props.history.push('/list/' + pages);
			return false;
		}
		return true;
	}
	_pages(count){
		return Math.ceil(count / this.limit);
	}
	/**
	 * Генерится массив страниц (не нашел как можно сделать for для диапазона в JSX)
	 * @return {Array}
	 * @private
	 */
	_pager() {
		let pages = this._pages(this.state.count);
		let pages_array = [];
		for (let i = 1; i <= pages; i++) {
			pages_array.push(i);
		}
		return pages_array;
	}

	/**
	 * обновляем список если обновилось состояние страницы
	 */
	componentWillUpdate(nextProps) {
		let next_page = nextProps.match.params.page ? +nextProps.match.params.page : 1;
		if (this._page !== next_page) {
			this._page = next_page;
			this.setState({
				page: next_page
			});
			this._updateList(next_page);
		}
	}

	_changePage(e) {
		e.preventDefault();
		let page = $(e.target).parent('li').data('page');
		this.props.history.push('/list/' + page);

	}

	render() {
		return (
			<div>
				<UserToolbar/>
				<div className="col-md-offset-2 col-md-8">
					<table className="table table-bordered">
						<tbody>
						{ this.state.users.map((user, index) => {
							return (
								<tr  data-id={user.id} key={index}>
									<td className="user-name">
											{user.first_name} {user.last_name} ({user.username})
									</td>
									<UserControls id={user.id}/>
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
										<li data-page={page} className={ page === this.state.page ? 'active' : ''}
										    key={page}><Link to={"/list/" + page} onClick={this._changePage.bind(this)}
										                     replace={true}>{page}</Link></li>
									)
								})}
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}