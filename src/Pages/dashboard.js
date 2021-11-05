import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../Components/header.js";
import firebase from "../Database/firebase.js";
import { set_user } from "../Store/action";
import "../Css/dashboard.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import user from "../Images/user.png";
function Dashboard(props) {
  const history = useHistory();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const name = user.displayName;
        props.set_user(uid, email, name);
      } else {
        props.set_user(null, null, null);
        history.push("/");
      }
    });

    const userRef = firebase.database().ref("/").child("posts");
    userRef.on("value", (snapshot) => {
      let newUsersState = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();

        newUsersState.push({
          key: data.key,
          host: dataVal.host,
          hostid: dataVal.hostid,
          post: dataVal.post,
          postType: dataVal.postType,
          description: dataVal.description,
        });
      });
      setPosts(newUsersState);
    });
  }, [history, props]);

  const addPost = () => {
    history.push("/addpost");
  };

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center", padding: 20 }}>ALL USER POSTS</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {posts.map((v, i) => {
          return (
            <div className="containers" key={i}>
              <div className="top_bar">
                <div className="profile_img">
                  <img src={user} alt="" />
                  <Link
                    to={{ pathname: "/userposts/" + v.hostid }}
                    style={{
                      paddingLeft: "50px",
                      color: "black",
                      fontWeight: "bolder",
                      textDecoration: "none",
                    }}
                  >
                    {v.host}
                  </Link>
                </div>
                <i className="fa fa-ellipsis-h"></i>
              </div>
              <div className="main_img">
                {v.postType === "image" ? (
                  <img src={v.post} alt="" className="img-fluid" />
                ) : (
                  <video width="100%" height="400" controls>
                    <source src={v.post} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="footer">
                <br />

                <div className="content">
                  <p>{v.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          marginBottom: "20px",
          marginRight: "20px",
        }}
      >
        <Fab
          aria-label="add"
          style={{ color: "#fff", backgroundColor: "#151E3D" }}
          onClick={addPost}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  email: state.currentUseremail,
});

const mapDispatchToProps = (dispatch) => ({
  set_user: (uid, email, name) => dispatch(set_user(uid, email, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
