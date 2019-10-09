import React, { Component } from "react";
import store from 'store'
import 'whatwg-fetch';
import DashboardNav from './Dashboard_Nav_Top'
import DashboardNavSide from './Dashboard_Nav_Side'
import PersonalInfoRow from './PersonalInfoRow'

class CancelAccount extends Component {


    render() {
       
        return (
            <div>
                <DashboardNav />
                <div style={{ height: "100vh" }} className="row">
                    <DashboardNavSide />
                    <div className="col-xl-10 no-gutter text-center bg-white">
                        <div className="row pb-3 pt-3 border-bottom">
                            <div className="col-xl-12">
                                <h4>Cancel Account</h4>
                            </div>
                        </div>
                        <h5 className="text-left pt-3 pb-2">To cancel account, please provide the correct password:</h5>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CancelAccount;