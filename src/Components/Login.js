import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  CardBody,
  Card,
  CardHeader,
  Grid
} from "mdbreact";
import "./Custom.css";
import loader from "./loader.gif";
import * as PubSub from "pubsub-js";
import { Link } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js";
import ShareDare from "./ShareDare";
import AdminQuestion from "./AdminQuestion";
import AdminPanel from "./AdminPanel";
var md5 = require("md5");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      obj: {},
      data: "",
      loader: false,
      btndisable: true,
      errEmail: "",
      errPass: "",
      errors: "",
      is_dare: false,
      isLoggedIn: false,
      isAdmin: false,
      emailVerified: false,
      forgetPassword: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.state.loginFunction = this.loginFunction.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errors: "" });
  }

  componentWillMount() {
    if (sessionStorage.getItem('forgetverified')) {
      this.setState({
        forgetPassword: true
      })
    }
    if (sessionStorage.getItem('verified')) {
      this.setState({
        emailVerified: true
      })
    }
    if ((localStorage.getItem('token') != null) && (localStorage.getItem('name') === "Admin")) {
      this.props.history.push("/adminquestion")
      return
    }
    if (localStorage.getItem('token') != null) {
      if (localStorage.getItem('link') != null) {
        this.props.history.push("/send_invite")
      } else {
        this.props.history.push("/user-question")
      }
    }
  }
  loginFunction(e) {
    this.setState({
      loader: true
    });

    this.state.obj["email"] = this.state.email;
    this.state.obj["password"] = md5(this.state.password);

    var postData = this.state.obj;
    var that = this;

    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/sign_in`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        that.setState({
          loader: false
        });
        if (data.error === "Please verify your email") {
          that.setState({
            errors: "Please verify your email"
          });
          return;
        }
        if (data.error === "Incorrect Username/Password") {
          that.setState({
            errors: "Incorrect username/password"
          });
          return;
        }
        if (data.data.auth_token != null) {
          localStorage.setItem('luser_id', data.data.user_id);
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
              isLoggedIn: true,

            });
            that.setState({
              isAdmin: true
            })
          } else {
            if (data.data.is_dare) {
              that.setState({
                isDareCreated: true,
                isLoggedIn: true,
                link: data.data.link,
                user_id: data.data.user_id
              });

              if (localStorage.getItem('links') != null) {
                var retrievedData = localStorage.getItem('links');
                var links = JSON.parse(retrievedData);
                links.push(data.data.link);
                localStorage.setItem('links', JSON.stringify(links));
              }
              else {
                var linkArr = [];
                linkArr.push(data.data.link);
                localStorage.setItem('links', JSON.stringify(linkArr));
              }
              localStorage.setItem('lglink', data.data.link);
              localStorage.setItem("dareCreated", true);
              that.props.history.push("/send_invite");
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
      <div class="contact-body">
        {!this.state.isLoggedIn && (
          <div class="row">
            <div class="col-md-3" />
            <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
              <Container>
                <Row>
                  <Col md="10">
                    <Card>
                      <CardBody>
                        <form onSubmit={this.loginFunction.bind(this)}>
                          {this.state.forgetPassword &&
                            <div class="alert alert-primary" role="alert">
                              Your password is changed Successfully..!
                         </div>}
                          {this.state.emailVerified &&
                            <div class="alert alert-success" role="alert">
                              Your Account is Activated, login to continue..!
                          </div>}
                          <p className="h3 text-center py-4">Log In </p>
                          <div className="grey-text">
                            <Input
                              label="Your email"
                              icon="envelope"
                              group
                              name="email"
                              type="email"
                              required
                              validate
                              error="wrong"
                              success="right"
                              value={this.state.email}
                              onChange={this.handleChange}
                            />
                            <Input
                              label="Your password"
                              icon="lock"
                              group
                              type="password"
                              name="password"
                              validate
                              required
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                            <span
                              style={{
                                color: "red",
                                fontSize: "15px",
                                marginLeft: "3px"
                              }}
                            >
                              {this.state.errors != "" &&
                                <div class="alert alert-danger" role="alert">
                                  {this.state.errors}
                                </div>}
                            </span>
                            <p className="font-small grey-text d-flex justify-content-end">
                              <Link to="/forgotpassword">
                                {" "}
                                Forgot Password?{" "}
                              </Link>{" "}
                            </p>
                          </div>
                          <div className="text-center py-4 mt-3">
                            <Button class="btn" style={{ borderRadius: "25px", width: "125px", height: "50px", backgroundColor: "#2E86C1", color: "white", textTransform: "none" }} type="submit">
                              Login
                            </Button>
                          </div>
                          <p className="font-small grey-text d-flex justify-content-center">
                            Don't have an account?&nbsp;
                            <Link to="/register">Sign up</Link>
                          </p>
                        </form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
        {this.state.isDareCreated && (
          <ShareDare
            link={this.state.link}
            history={this.props.history}
            user_id={this.state.user_id}
          />
        )}
        {this.state.isAdmin && <AdminQuestion history={this.props.history} />}
      </div>
    );
  }
}

export default Login;
