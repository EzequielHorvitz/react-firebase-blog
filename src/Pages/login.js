import React, { useState } from "react";
import { connect } from "react-redux";
import signinimg from "../Images/signinimg.jpg";
import "../Css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import firebase from "../Database/firebase.js";

export const Login = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    if (email === "" || password === "") {
      alert("Please Fill All Information");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          history.push("/dashboard");
        })
        .catch(function (error) {
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="main">
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <img src={signinimg} alt="singinimage" />
              <br />
              <br />
              <Link to="/signup" className="signup-image-link">
                Register Now
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Login Now</h2>
              <div className="register-form" id="login-form">
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="your_name"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </label>
                  <input
                    type="email"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ borderBottom: "1px solid black" }}
                >
                  <label
                    htmlFor="your_pass"
                    style={{ position: "absolute", top: "15%", left: "0" }}
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group form-button">
                  <button
                    onClick={signin}
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    style={{ width: "150px" }}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
