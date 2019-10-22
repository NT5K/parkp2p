import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
// import PersonalInfoRow from './PersonalInfoRow'
import store from 'store'
import 'whatwg-fetch';
import PersonalInfoRow from './PersonalInfoRow'
// const carQuery = new CarQuery();

class Profits extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            token: '',
            displayBalance: '',
            balanceToPostRequest: '0',
            displayCredit: '0'
        };

this.onTextboxChangeBalance = this.onTextboxChangeBalance.bind(this)
this.updateBalance = this.updateBalance.bind(this)    

}


    UNSAFE_componentWillMount() {
        localStorage.getItem('park_p2p') && this.setState({
            token: store.get('park_p2p').token
        })
    }

    componentDidMount() {
        const { token /*, user*/ } = this.state
        fetch('/api/account/personal/profits/' + token)
        .then(res => res.json())
        .then(user => {
            const { Balance } = user[0]
            console.log(user)
            this.setState({
                user: user[0],
                displayBalance: Balance,
                //displayCredit: Credit               
            })
        // }, () => console.log("user array", user, "this users token", token))
        }, () => console.log('success'))
    }

    onTextboxChangeBalance(event){
        this.setState({
        balanceToPostRequest: event.target.value
        })  
    }

    updateBalance(event){
    event.preventDefault()
    const {displayBalance, balanceToPostRequest, token} = this.state
    const newBalance = displayBalance - balanceToPostRequest;
    if(displayBalance >= balanceToPostRequest){
        fetch('/api/account/update/balance/withdraw', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                token,
                balanceToPostRequest,
                newBalance
                })
            })
            .then(res => res.json())
            .then(json => {
                    if (json.success) {
                        this.setState({
                            displayBalance: newBalance
                        });
                        console.log("worked!")
                    }
            }); 
        }
    }

    render() {
        
        const {displayBalance, displayCredit, balanceToPostRequest, token} = this.state
        const {updateBalance, onTextboxChangeBalance} = this

        if (!token) {
            return (
                <div>
                    <Redirect to='/login' />
                </div>
            )
        }

        return (
            <div className="container-flex">
                <div className="row pb-3 pt-3 border-bottom text-center">
                    <div className="col-xl-12">
                        <h4>Profits</h4>
                    </div>
                </div>
                <div className="row mt-3 text-dark text-center">
                    <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Balance</b></u></h5>
                        <p>(The amount of money you have made renting out your driveway)</p>
                        <h2><b>Balance: ${displayBalance}</b></h2>
                    </div>
                </div>

                <div className="row mt-3 text-dark text-center">
                    <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Credit</b></u></h5>
                        <p>(The amount of money you can use to rent a driveway)</p>
                        <h2><b>Credit: ${displayCredit}</b></h2>
                    </div>
                </div>

                <div className="row mt-3 text-dark text-center">
                    <div className="col-sm-12">
                        <h5 className="text-center"><u><b>Withdraw</b></u></h5>
                        <p>(Send the money that you have made to your bank account)</p>
                        <PersonalInfoRow 
                        header="Withdraw Funds"
                        displayText={'Balance: $' + displayBalance}
                        id={"update_balance"}
                        action={"/api/account/update/balance/withdraw"}
                        type={"number"}
                        inputId={"balance"}
                        value={balanceToPostRequest}
                        onChange={onTextboxChangeBalance}
                        placeholder={"enter withdrawal amount"}
                        onClick={updateBalance}
                        buttonText={"Submit"}
                        />

                    </div>
                </div>

                
            </div>
        )
    }
}

export default Profits
