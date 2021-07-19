import React from 'react';
import Auxi from '../../../hoc/Auxi';
import classes from './OrderSummary.css';

class OrderSummary extends React.Component {

    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li>
                )

            })
        return (
            <Auxi>
                <h3 className={classes.H3}>Your Order</h3>

                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue To Checkout?</p>
                <div className="text-center">
                    <button 
                        className="btn btn-sm mx-2 my-3"
                        style={{
                            backgroundColor: 'darkred',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                        onClick={this.props.click}>CANCEL</button>
                    <button 
                        className="btn btn-sm mx-2 my-3"
                        style={{
                            backgroundColor: 'darkred',
                            color: 'white',
                            fontWeight: 'bold'
                        }} 
                        onClick={this.props.continue}>CONTINUE</button>
                </div>

            </Auxi>
        )
    }
}


export default OrderSummary