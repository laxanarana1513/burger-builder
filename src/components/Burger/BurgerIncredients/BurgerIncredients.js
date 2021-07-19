import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIncredients.css';

class BurgerIncredient extends React.Component {
    render() {
        let incredient = null

        switch (this.props.type) {
            case ('bread-bottom'):
                incredient = <div className={classes.BreadBottom}></div>
                break;

            case ('bread-top'):
                incredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                )
                break;

            case ('aloo_tiki'):
                incredient = <div className={classes.AlooTiki}></div>
                break;

            case ('cheese'):
                incredient = <div className={classes.Cheese}></div>
                break;

            case ('salad'):
                incredient = <div className={classes.Salad}></div>
                break;

            case ('bacon'):
                incredient = <div className={classes.Bacon}></div>
                break;
            default:
                incredient = null;
        }

        return incredient;
    }

}

BurgerIncredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIncredient