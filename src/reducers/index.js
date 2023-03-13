const initialState = {
    users: [],
    messages: [] 
}

function reducer(state=initialState, action){
    switch (action.type){
        case 'USERS_FETCHED': 
            return {
                ...state,
                users: action.payload
            }
        case 'USER_ADDED': 
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case 'USER_DELETED': 
            return {
                ...state,
                users: state.users.filter(item => item.id !== action.payload)
            }
        case 'MESSAGE_ADDED': 
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }
}

export default reducer