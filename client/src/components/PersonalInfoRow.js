import React, { Component } from "react";

class PersonalInfoRow extends Component {
    render() {
        const { 
            header, 
            displayText, 
            action, 
            id, 
            type, 
            inputId, 
            value, 
            onChange, 
            placeholder, 
            onClick, 
            buttonText 
        } = this.props
        
        return (
            
            <div className="row mt-2 text-dark text-center justify-content-center">
                <div className="col-md-6 col-xs-12">
                    <div className="row flex">
                        <div className="col-5">
                            <h6 className="border-right"><b>{header}</b></h6>
                        </div>
                        <div className="col-7">
                            <p>{displayText}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12 mb-4">
                    <div className="row flex">
                        <div className="col-8">
                            <form id={id} method="POST" action={action}>
                                <input
                                    type={type}
                                    id={inputId}
                                    name={inputId}
                                    value={value}
                                    onChange={onChange}
                                    className="form-control"
                                    placeholder={placeholder}
                                    required
                                />
                            </form>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-sm btn-primary " type="submit" form={id} onClick={onClick}>
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 col-xs-6">
                    <form id={id} method="POST" action={action}>
                        <input
                            type={type}
                            id={inputId}
                            name={inputId}
                            value={value}
                            onChange={onChange}
                            className="form-control"
                            placeholder={placeholder}
                            required
                        />
                    </form>
                </div>
                <div className="col-md-1 col-xs-6">
                    <button className="btn btn-sm btn-primary " type="submit" form={id} onClick={onClick}>
                        {buttonText}
                    </button>
                </div> */}
            </div>
        )
    }
}

export default PersonalInfoRow;


