import axios from 'axios'
import { FETCH_USER } from './types'

//action creation function
export const fetchUser = () => async dispatch =>{
    //making use of axios to fetch user status from the expresss api backkend server
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleTokenBackend = (token) => async dispatch =>{
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data })
}