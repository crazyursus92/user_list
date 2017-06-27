import React from "react";
import Input from "./Input";

export default class Checkbox extends Input {


	render() {
		let className = 'col-sm-9 pull-right ' + (this.props.error ? 'has-error' : '');
		return (
			<div className="form-group">
				<div className={className}>
					<div className="checkbox">
						<label>
							<input type="checkbox" name={this.props.name} value={this.props.value} onChange={this.props.onChange}
							       checked={!!this.props.value}/>
							{this.props.label}
						</label>
					</div>
				</div>
			</div>
		);
	}
}