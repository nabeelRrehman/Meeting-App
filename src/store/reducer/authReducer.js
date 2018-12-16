import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    USER: null,
    REQUEST: null,
    USERPROFILE: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER:
            return ({
                ...states,
                USER: action.payload
            })
        case actionTypes.REQUEST:
            return ({
                ...states,
                REQUEST: action.payload
            })
        case actionTypes.USERPROFILE:
            return ({
                ...states,
                USERPROFILE: action.payload
            })
        default:
            return states;
    }
}