import React from 'react';
import Container from './../Container/Container'

const styles = {
    fluidContainer: {
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: 400
}
}
function Main(props) {
    return (
        <Container>

            <div className="row mt-5">
                <div className="col-10">
                    <h1>{props.address}</h1>
                    <h3>~ Casa Caracol</h3>
                </div>
            </div>
        </Container>
    )
}

export default Main;