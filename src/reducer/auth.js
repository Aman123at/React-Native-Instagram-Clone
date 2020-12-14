import {SET_USER,IS_AUTHENTICATED,SET_USERPROFILE} from '../action/action.types'
const initialState = {
    user:null,
    loading:true,
    isAuthenticated:false,
    userProfile:null,
}

export default (state=initialState,action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user:action.payload,
                loading:false
            }

        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated:action.payload,
                loading:false
            }

        case SET_USERPROFILE:
            return {
                ...state,
                userProfile:action.payload
            }
            
            
    
        default:
            return state;
    }
}