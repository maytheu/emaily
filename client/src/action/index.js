import axios from 'axios'
import { FETCH_SURVEYS, FETCH_USER } from './types'

//action creation function for the user
export const fetchUser = () => async dispatch =>{
    //making use of axios to fetch user status from the expresss api backkend server
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
}

//to handle the payment in the payment gateway
export const handleTokenBackend = (token) => async dispatch =>{
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data })
}

//to submit survey
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values)

    history.push('/surveys')
    dispatch({ type: FETCH_USER, payload: res.data })
}

//display details to the dashboard
export const fetchSurvey = () => async dispatch => {
    const res = await axios.get('/api/surveys')
    dispatch({ type: FETCH_SURVEYS, payload: res.data })
}