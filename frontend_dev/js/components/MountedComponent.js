import React, {Component} from "react";

export default class MountedComponent extends Component{
	constructor(props){
		super(props);
		this.isMounted = false;
	}

	componentDidMount() {
		this.isMounted = true;
	}
	componentWillUnmount(){
		this.isMounted = false;
	}

}