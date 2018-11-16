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
        console.log(data);
        if (data.error === "Incorrect Username/Password") {
          that.setState({
            loader: false,
            errors: "Incorrect username/password"
          });
          return;
        }
        if (data.data.auth_token != null) {
          that.setState({ auth_token: data.data.auth_token });
          PubSub.publish("UPDATE_NAV_MENU", data.data.name);
          var _secretKey = "thekeyof12NewSite";
          var simpleCrypto = new SimpleCrypto(_secretKey);
          var plainText = data.data.auth_token;
          var chiperText = simpleCrypto.encrypt(plainText);
          localStorage.setItem("token", chiperText);
          if (data.data.is_admin) {
            that.setState({
              adminData: data.data.admin_data,
              isLoggedIn: true
            });
            that.setState({
              isAdmin: true
            });
          } else {
            if (data.data.is_dare) {
              that.setState({
                isDareCreated: true,
                isLoggedIn: true,
                link: data.data.link,
                user_id: data.data.user_id
              });
              localStorage.setItem("dareCreated", true);
            } else {
              that.props.history.push("/user-question");
              localStorage.setItem("dareCreated", false);
            }
          }
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
    return (
      <div style={{ marginTop: "80px" }}>
        
      </div>
    );
  }
}
