import axios from 'axios'

const _publicRequest = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL_SERVER
})

const _userRequest = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL_SERVER
})


export {_publicRequest,_userRequest}