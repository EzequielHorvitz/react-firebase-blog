import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import firebase from '../Database/firebase.js'
import { set_user } from '../Store/action'


export const Header = (props) => {
    const history = useHistory();


    const logout = () => {
        firebase.auth().signOut().then(() => {
            props.set_user(null, null, null)
            history.push('/')
        }).catch((error) => {
            console.log(error)
        });
    }

    const gotohome = () => {
        history.push('/dashboard');
    }
    return (
        <div style={{ backgroundColor: "#151E3D", height: "70px", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h2 style={{ color: "white", fontWeight: "bold", cursor: "pointer",  marginLeft: "10px" }} onClick={gotohome}>Blog Posts</h2>

            </div>
            <div>

            </div>
            <div style={{ marginRight: "5px", display: "flex", justifyContent: "flex-end", flexWrap: 'wrap' }}>
            <Link className="btn btn-success btn-sm" to={{ pathname: '/myposts' }} style={{ marginLeft: "10px" }}>My Posts</Link>

                <button className="btn btn-danger btn-sm" onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
            </div>

        </div>
    )
}



const mapStateToProps = (state) => ({
    hasUser: state.hasUser,
    email: state.currentUseremail
})


const mapDispatchToProps = (dispatch) => ({
    set_user: (uid, email, name) => dispatch(set_user(uid, email, name))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
