const INITIAL_SATE = {
    hasUser: false,
    currentUseremail: null,
    uid: null,
    name: null

}

const app = (state = INITIAL_SATE, action) => {
    switch (action.type) {
        case "SetUser":
            return ({
                ...state,
                currentUseremail: action.currentUseremail,
                uid: action.uid,
                name: action.name,
                hasUser: action.hasUser
            })
        case "SignOut":
            return ({
                ...state,
                currentUseremail: action.currentUseremail,
                uid: action.uid,
                name: action.name,
                hasUser: action.hasUser
            })

        default:
            return state;
    }
}

export default app;
