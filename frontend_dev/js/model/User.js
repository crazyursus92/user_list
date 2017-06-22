/**
 * Created by ursus on 21.06.17.
 */
export  default  class User {
	constructor(data){
		data = data || {};
		this.id = !isNaN(+data.id) ? +data.id : 0;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.password = data.password;
		this.type =!isNaN(+data.type) ? +data.type : 0;
		this.username = data.username;
	}

	isManager(){
		return this.type === 1;
	}

	isUser(){
		return this.type === 1;
	}

	isGuest(){
		return this.type === 0 || !this.type;
	}

	/**
	 *
	 * @param {User} user
	 */
	isEquals(user){
		return this.id === user.id && this.type === user.type;
	}
}
