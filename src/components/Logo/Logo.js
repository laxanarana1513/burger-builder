import React from 'react';
import burgerLogo from '../../assets/images/1L.jpg';

const logo = (props) => (
    
    <div style={{padding: '8px', height: props.height, boxSizing: 'border-box'}}>
        <img src={burgerLogo} alt="MyBurger"
            style={{height: '100%', borderRadius: '5px'}} />       
     
    </div>
    
)

export default logo