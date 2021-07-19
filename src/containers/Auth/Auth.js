import React from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/indexactions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Auth extends React.Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email ID'
                },
                num: 12,
                value: '',
                label: 'Email ID',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                num: 12,
                value: '',
                label: 'Password',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if ( !this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchLoginHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }



    render() {

        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                num={formElement.config.num}
                label={formElement.config.label}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />


        ))

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = (
                <p style={{textAlign: 'center', fontWeight: 'bold', color: 'red'}}>
                    {this.props.error.message}
                </p>
            )
        }

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div style={{ margin: '25px auto', padding: '30px 20px', width: '72%' }} >
                {authRedirect}
                <h4 className="my-2 py-4" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.9rem', color: '#080868' }}>Login / Sign Up</h4>
                {errorMessage}
                <form className="row g-3" onSubmit={this.submitHandler}>
                    {form}

                    <div className="col-12 py-3 text-center">
                        <button
                            className="btn btn-lg"
                            style={{
                                backgroundColor: 'darkred',
                                color: 'white',
                                fontWeight: 'bold'
                            }} >{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</button>

                    </div>

                </form>

                <div className="col-12 py-2 text-center">
                    <button
                        onClick={this.switchLoginHandler}
                        className="btn btn-sm"
                        style={{
                            backgroundColor: 'darkred',
                            color: 'white',
                            fontWeight: 'bold'
                        }} >SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</button>
                </div>

            </div>
        )


    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);