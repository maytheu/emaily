import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchSurvey } from '../../action'

class SurveyList extends Component{

    componentDidMount(){
        this.props.fetchSurvey()
    }

    render(){
        return(
            <div>
                SsurveyList
            </div>
        )
    }
}

function mapStatetoProps(state){
    return { surveys: state.surveys} //from reducer
}

export default connect(mapStatetoProps, { fetchSurvey })(SurveyList)