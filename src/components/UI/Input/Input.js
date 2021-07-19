import React from 'react';
import Auxi from '../../../hoc/Auxi';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = null

    if (props.elementType === 'input') {
        inputClasses = ["form-control"]
    }
    else if (props.elementType === 'select') {
        inputClasses = ["form-select"]
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    

    switch (props.elementType) {
        case ('input'):
            inputElement = props.num === 6 ?
                <div className="col-md-6">
                    <label className="form-label">{props.label}</label>
                    < input
                        // className={classes.InputElement}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />
                </div>
                :
                (props.num === 12 ?
                    <div className="col-12">
                        <label className="form-label">{props.label}</label>
                        < input
                            // className={classes.InputElement}
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </div>
                    :
                    <div className="col-md-4">
                        <label className="form-label">{props.label}</label>
                        < input
                            // className={classes.InputElement}
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </div>

                )

            break;
        // case ('textarea'):
        //     inputElement = <textarea
        //         className={classes.InputElement}
        //         {...props.elementConfig}
        //         value={props.value}
        //         onChange={props.changed} />;
        //     break;
        case ('select'):
            inputElement = (
                <div className="col-12">
                    <label className="form-label">Delivery Speed</label>
                    <select
                        // className={classes.InputElement}
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                </div>

            );
            break;
        default:
            inputElement = props.num === 6 ?
                <div className="col-md-6">
                    < input
                        // className={classes.InputElement}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />
                </div>
                :
                (props.num === 12 ?
                    <div className="col-12">
                        < input
                            // className={classes.InputElement}
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </div>
                    :
                    <div className="col-md-4">
                        < input
                            // className={classes.InputElement}
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed} />
                    </div>

                )
    }

    return (
        <Auxi>
            {/* <label className="form-label">{props.label}</label> */}
            {inputElement}
        </Auxi>


    );

};

export default input;