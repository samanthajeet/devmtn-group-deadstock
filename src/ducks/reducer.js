const initialState = {
    user: {}
}


const HANDLE_USER = 'HANDLE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function handleUser(user) {
    return {
        type: HANDLE_USER,
        payload: user
    }
}

export function clearUser(){
    return {
        type:CLEAR_USER
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HANDLE_USER:
            return { ...state, user: action.payload }
        case CLEAR_USER:
            return { ...state, user: {} }
        default:
            return state
    }
}