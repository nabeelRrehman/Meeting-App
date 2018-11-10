import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    USER: null,
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER:
            return ({
                ...states,
                USER: action.payload
            })
        default:
            return states;
    }
}