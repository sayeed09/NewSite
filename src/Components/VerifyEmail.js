import React from "react";
import * as PubSub from "pubsub-js";
import { Link } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js";
import AdminPanel from "./AdminPanel";
import loader from "./loader.gif";
var md5 = require("md5");
export default class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {},
      loader: true
    };
  }
  componentWillMount() {
    this.setState({
      loader: true
    });
    var urlString = new URL(window.location.href);
    var email = urlString.searchParams.get("email");
    var hash = urlString.searchParams.get("hash");
    this.state.obj["email"] = email;
    this.state.obj["hash"] = hash;

    var that = this;
    var postData = this.state.obj;
    fetch(` https://pure-badlands-16289.herokuapp.com/api/users/verify_email`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.data.auth_token != null) {
          alert("Successfully Account Created, Login to Continue");
          that.props.history.push("/login"); 
        } else {
          alert("Something went wrong");
        }
      });
  }

  render() {
    if (this.state.loader) {
      return (
        <div class="text-center">
          <img
            className="home-img"
            style={{
              height: "80px",
              width: "100px",
              marginTop: "300px",
              alignItems: "center"
            }}
            src={loader}
            className="img-responsive "
          />
        </div>
      );
    }
    return <div style={{ marginTop: "80px" }} />;
  }
}
