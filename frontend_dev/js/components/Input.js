import React, {Component} from "react";


let input_id = 0;

 class Input extends Component {

	constructor(props) {
		super(props);
		this.id = input_id++;
	}

	render() {
		let className = 'form-group ' + (this.props.className || ' ') +
			(this.props.required ? ' required ' : '') + (this.props.error ? 'has-error' : '');
		return (
			<div className={className}>
				<label htmlFor={`control-${this.id}`} className="col-sm-3 control-label">{this.props.label}</label>
				<div className="col-sm-9">
					<input type={this.props.type}
					       name={this.props.name}
					       className="form-control"
					       id={`control-${this.id}`}
					       onChange={this.props.onChange}
					       required={!!this.props.required}
					       maxLength={this.props.maxLength}
					       placeholder={this.props.placeholder}
					       value={this.props.value}/>
					<span className='help-block'>{this.props.error}</span>
				</div>

			</div>
		);
	}
}



Input.defaultProps = {
	required: false,
	placeholder: '',
	name: '',
	label: '',
	type: 'text',
	value: '',
	error: '',
	maxLength: 255
};

export default Input;