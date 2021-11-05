const set_user = (uid, email, name) => {
    return (dispatch) => {
        dispatch({
            type: "SetUser",
            currentUseremail: email,
            name: name,
            uid: uid,
            hasUser: true
        })
    }
}

const signout = () => {
    return (dispatch) => {
        dispatch({
            type: "SignOut",
            currentUseremail: null,
            name: null,
            uid: null,
            hasUser: false
        })
    }
}



export {
    set_user,
    signout
}