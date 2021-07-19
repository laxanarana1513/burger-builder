import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxi>
            <Backdrop show={props.open} click={props.closed} />

            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <Logo height="11%" />

                <nav style={{ marginTop: '32px' }}>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxi>

    )
}


export default sideDrawer