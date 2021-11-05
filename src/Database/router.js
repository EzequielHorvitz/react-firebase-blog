import React from 'react'
import { connect } from 'react-redux'
import Login from '../Pages/login.js'
import SignUp from '../Pages/signup.js'
import Dashboard from '../Pages/dashboard.js'
import AddPost from '../Pages/addpost.js'
import EditPost from '../Pages/editposts.js'
import MyPosts from '../Pages/myposts'
import UserPosts from '../Pages/userposts.js'

import { BrowserRouter as Router, Route } from "react-router-dom";

function AppRouter() {

    return (
        <>
            <Router>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/signup' component={SignUp}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
                <Route exact path='/addpost' component={AddPost}></Route>
                <Route exact path='/editpost/:key' component={EditPost}></Route>
                <Route exact path='/myposts' component={MyPosts}></Route>
                <Route exact path='/userposts/:key' component={UserPosts}></Route>


            </Router>
        </>
    )

}

const mapStateToProps = (state) => ({
    hasUser: state.hasUser,
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);