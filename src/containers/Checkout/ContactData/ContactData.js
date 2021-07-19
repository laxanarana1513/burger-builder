import React from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/indexactions';

class ContactData extends React.Component {

    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                num: 6,
                value: '',
                label: 'Name',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                num: 6,
                value: '',
                label: 'Email ID',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Address'
                },
                num: 12,
                value: '',
                label: 'Address',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter City'
                },
                num: 4,
                value: '',
                label: 'City',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            mobile: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Mobile Number'
                },
                num: 6,
                value: '',
                label: 'Mobile',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },

            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter State'
                },
                num: 6,
                value: '',
                label: 'State',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter PIN'
                },
                num: 4,
                value: '',
                label: 'PIN Code',
                valid: true,
                validation: {
                    required: false
                }
                
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'default', displayValue: 'Choose Delivery Speed' },
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'normal', displayValue: 'Normal' },
                        { value: 'slow', displayValue: 'Slow' }
                    ]
                },
                value: '',
                valid: true,
                validation: {
                    required: false
                }
            }
        },
        formIsValid: false,
        // loading: false

    }

    orderHandler = (event) => {
        event.preventDefault()
        // this.setState({ loading: true })

        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId

        }
        this.props.onOrderBurger(order, this.props.token)
        
    }

    checkValidity (value, rules){
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

        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement
        // console.log(updatedFormElement)

        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        // console.log(formIsValid)

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }


    render() {

        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler} className="row g-3">
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        num={formElement.config.num}
                        label={formElement.config.label}
                        invalid={ !formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}

                <div className="col-12 py-3 text-center">
                    <button 
                        className="btn btn-lg" 
                        style={{ 
                            backgroundColor: 'darkred', 
                            color: 'white', 
                            fontWeight: 'bold' 
                        }}
                        disabled={ !this.state.formIsValid} >ORDER</button>
                </div>


            </form>
        )



        if (this.props.loading) {
            form = <Spinner />
        }



        return (
            <div style={{ margin: '25px auto', padding: '30px 20px', width: '75%' }}>
                <h3 className="my-2 py-4" style={{ fontWeight: 'bold', textAlign: 'center' }}>Enter your Contact Details</h3>

                {form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios))