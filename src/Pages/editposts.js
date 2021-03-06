import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Components/header.js";
import { v4 as uuid } from "uuid";
import firebase from "../Database/firebase.js";
import add_photo from "../Images/add_photo.PNG";
import uploading from "../Images/uploading.gif";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { set_user } from "../Store/action";
import "../Css/addpost.css";

function EditPost(props) {
  const history = useHistory();
  const [description, setDescription] = useState("");

  const [post, setPost] = useState("");
  const [postType, setPostType] = useState("");
  const [isUploading, setisUploading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        const name = user.displayName;
        setUserName(name);
        setUserid(user.uid);
        props.set_user(uid, email, name);

        firebase
          .database()
          .ref("posts")
          .child(props.match.params.key)
          .on("value", (snapshot) => {
            const dataVal = snapshot.val();

            setDescription(dataVal.description);
            setPost(dataVal.post);
            setPostType(dataVal.postType);
          });
      } else {
        props.set_user(null, null, null);
        history.push("/");
      }
    });
  }, [history, props]);
  const success = () => {
    firebase
      .database()
      .ref("posts/" + props.match.params.key)
      .set({
        key: props.match.params.key,
        description: description,
        post: post,
        host: userName,
        hostid: userId,
        postType: postType,
      });

    alert("Post Uploaded Success");
    history.push("/dashboard");
  };

  const displayimagehandleChange = async (e) => {
    const file = e.target.files[0];

    if (
      file.type === "video/mp4" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      setisUploading(true);

      if (file.type === "video/mp4") {
        setPostType("video");
      } else {
        setPostType("image");
      }

      const id = uuid();
      const storageRef = firebase.storage().ref("posts").child(id);
      await storageRef.put(file);
      storageRef.getDownloadURL().then((url) => {
        setPost(url);
        setisUploading(false);
      });
    } else {
      alert("Unsupported Extension File");
    }
  };

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center", padding: 20 }}>Edit Post</h1>

      <center>
        <div className="containers">
          <div className="card">
            <div
              className="signin-content"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="signin-forms" style={{ width: "90%" }}>
                <div className="register-form" id="login-form">
                  <div>
                    <p style={{ textAlign: "left" }}>
                      Description<sup>*</sup>
                    </p>
                    <br />
                    <textarea
                      type="text"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      value={description}
                      id="ad_description"
                      maxLength="700"
                      minLength="5"
                      style={{ marginTop: "-15px", height: "140px" }}
                    />
                    <p style={{ fontSize: "12px" }}>
                      A minimum length of 5 characters is required. Please edit
                      the field.
                    </p>
                  </div>
                  <br />
                  <br />
                  <div>
                    <p style={{ textAlign: "left" }}>
                      Upload Content<sup>*</sup>
                    </p>

                    <div className="card">
                      <div className="upload-btn-wrapper">
                        <br />

                        {post !== "" && postType === "image" ? (
                          <img
                            src={post}
                            alt="logo"
                            width="200px"
                            height="200px"
                          />
                        ) : post !== "" && postType === "video" ? (
                          <video width="320" height="240" controls>
                            <source src={post} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={add_photo} alt="logo" />
                        )}

                        <br />
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={displayimagehandleChange}
                        />
                      </div>
                    </div>
                    <Dialog open={isUploading}>
                      <DialogContent>
                        <img
                          src={uploading}
                          alt="uploading"
                          className="d-flex align-self-center"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <br />
                  <br />
                  <div>
                    <div className="form-group form-button">
                      <button
                        className="btn btn-secondary"
                        onClick={success}
                        style={{ backgroundColor: "#001D38", color: "white" }}
                      >
                        UPDATE NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </center>
    </>
  );
}

const mapStateToProps = (state) => ({
  hasUser: state.hasUser,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  set_user: (uid, email, name) => dispatch(set_user(uid, email, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
