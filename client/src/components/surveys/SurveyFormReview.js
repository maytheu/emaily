import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import formFields from './formFields'
import * as actions from '../../action'


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewField = _.map(formFields, ({ name, label}) => {
        return(
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    return(
        <div>
            <h5>Please Confirm your Entries</h5>
            {reviewField}
            <button 
                className="yellow darken-3 btn-flat white-text" 
                onClick={onCancel}
            >
                <i className="material-icons left">navigate_before</i>
                Back
            </button>
            <button 
            className="green btn-flat right white-text" 
            onClick={() => submitSurvey(formValues, history)} 
            >
                <i className="material-icons right">email</i>
                Send Survey
            </button>
        </div>
    )
}
function mapStatetoProps(state){
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStatetoProps, actions)(withRouter(SurveyFormReview))