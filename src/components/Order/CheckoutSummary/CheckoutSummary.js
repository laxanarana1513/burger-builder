import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 className="my-2 py-4" style={{ fontWeight: 'bold' }}>We Hope It Tastes Well!!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div className="text-center">
                <button
                    className="btn btn-lg mx-2 my-3"
                    style={{
                        backgroundColor: 'darkred',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                    onClick={props.checkoutCancelled} >CANCEL</button>
                <button 
                    className="btn btn-lg mx-2 my-3" 
                    style={{ 
                        backgroundColor: 'darkred', 
                        color: 'white', 
                        fontWeight: 'bold' 
                    }}
                    onClick={props.checkoutContinued} >CONTINUE</button>
            </div>

        </div>
    )
}

export default checkoutSummary