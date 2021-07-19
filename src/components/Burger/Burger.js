import React from 'react';
import classes from './Burger.css'
import BurgerIncredients from './BurgerIncredients/BurgerIncredients';


const burger = (props) => {
    // console.log(props)
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIncredients key={igKey + i} type={igKey} /> 
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!!</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIncredients type="bread-top" />
            {transformedIngredients}
            <BurgerIncredients type="bread-bottom" />
        </div>
    )
}

export default burger