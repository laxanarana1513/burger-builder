import React from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'

class Layout extends React.Component {
    constructor(){
        super();
        this.state = {
            showSideDrawer: false
        }
        this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this)
        this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this)
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Auxi>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer  
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        )
    }
}


const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null   
    }
}


export default connect(mapStateToProps) (Layout)