import /*React,*/ { Component }  from "react";
import DateDiff from 'date-diff';
// import { Link } from 'react-router-dom'
// import { slide as Menu } from "react-burger-menu";
// import store from 'store'
// import { getFromStorage } from '../utils/storage'

class BackgroundProcess extends Component {

    constructor(props) {
        super(props);

        this.state = {
        time: new Date(),
        reservations: []
        };

    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: new Date() }), 600000);
    
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkDb() {
    fetch('/api/reservations/')
    .then(res => res.json())
    .then(reservations => {

        

        reservations.map(index => {

        

        let date1 = new Date()
        let date2 = new Date(index.End_Date);
        let diff = new DateDiff(date2, date1);
        let EndDateBool = diff.difference < 0
        if(EndDateBool){
        
        console.log("here")

        fetch('/api/reserve/remove/automatically', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                makerID: index.MakerId,
                rowID: index.ID
            })
        })
        .then(res => res.json())
        .then(json => {
            // set state for display
            if (json.success) {
            console.log("SUCCESS!!!")
            }
        });


        }

    
    })

    
    
    })
}
    

    render() {  
        
        this.checkDb()


    return null
    
    }



}

export default BackgroundProcess
