import React, { useState } from "react";
import { connect } from "react-redux";
import signupimg from "../Images/signupimg.jpg";
import "../Css/style.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import firebase from "../Database/firebase.js";

export const SignUp = (props) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");

  const register = () => {
    if (rpassword === "" || password === "" || email === "" || name === "") {
      alert("Please Fill All The Information");
    } else if (rpassword !== password) {
      alert("Password Dont Match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          function (result) {
            firebase
              .database()
              .ref("users/" + result.user.uid)
              .set({
                key: result.user.uid,
                name: name,
                email: email,
                password: password,
              });
            result.user
              .updateProfile({
                displayName: name,
              })
              .then(
                function () {
                  alert("Signup Success");
                  history.push("/");
                },
                function (error) {
                  // console.error(error);
                  alert(error);
                }
              );
          },
          function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            // var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === "auth/weak-password") {
              alert("The password is too weak.");
            } else {
              // console.error(error);
              alert(error);
            }
            // [END_EXCLUDE]
          }
        );
    }
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <div className="register-form" id="register-form">
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="name"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="email"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="pass"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="re-pass"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                    onChange={(e) => setRpassword(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group form-button">
                  <button
                    type="submit"
                    onClick={register}
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className="signup-image">
              <img src={signupimg} alt="singupimage" />
              <br />
              <Link to="/" className="signup-image-link">
                I am already a member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
