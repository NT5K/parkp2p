import React, { Component } from "react";

class PersonalInfoRow extends Component {
    render() {
        // console.log(this.props)
        return (
        
            <div className="row mt-2 text-dark text-center">
                <div className="col-sm-3">
                    <h6 className="border-right">{this.props.header}</h6>
                </div>
                <div className="col-sm-4">
                    {this.props.displayText}
                </div>
                <div className="col-sm-3">
                    <form id={this.props.id} method="POST" action={this.props.action}>
                        <input
                            type={this.props.type}
                            id={this.props.inputId}
                            name={this.props.inputId}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            required
                        />
                    </form>
                </div>
                <div className="col-sm-1">
                    <button className="btn btn-sm btn-primary " type="submit" form={this.props.id} onClick={this.props.onClick}>
                        {this.props.buttonText}
                    </button>
                </div>
            </div>
        )
    }
}

export default PersonalInfoRow;


