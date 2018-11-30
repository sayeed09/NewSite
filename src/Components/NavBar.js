import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "mdbreact";
import loader from "./loader.gif";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Login from "./Login";
import ResponseDare from "./ResponseDare";
import ResponsePlayer from "./ResponsePlayer";
import ShareDare from "./ShareDare";
import Result from "./Result";
import * as PubSub from "pubsub-js";
import Register from "./Register";
import EditQuestion from "./EditQuestion";
import AdminQuestion from "./AdminQuestion";
import ShowScore from "./ShowScore";
import DareResult from "./DareResult";
import CustomQuestion from "./CustomQuestion";
import ForgetPassword from "./ForgetPassword";
import SimpleCrypto from "simple-crypto-js";
import Temp from "./temp";
import ChangePassword from "./ChangePassword";
import Adminadd from "./Adminadd";
import UserAdded from "./UserAdded";
import { withRouter } from "react-router";
import AdminPanel from "./AdminPanel";
import Answers from "./Answers";
import VerifyEmail from "./VerifyEmail";
import ForgetPasswordComponent from "./ForgetPasswordComponent";
import logo from "./logo.jpg";
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      flg: true,
      abtflg: false,
      contactflg: false,
      loginflg: false,
      isLoggedIn: false,
      obj: {},
      loader: false, ref: ''
    };
    this.onClick = this.onClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  btnLogout(e) {
    this.setState({
      loader: true
    })
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);
    this.state.obj["auth_token"] = decipherText;
    var postData = this.state.obj;
    var that = this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/logout`, {
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

        if (localStorage.getItem('links') != null) {
          var retrievedData = localStorage.getItem('links');
          var links = JSON.parse(retrievedData);
          links = links.filter(function (item) {
            return item !== localStorage.getItem('lglink')
          })
          localStorage.setItem('links', JSON.stringify(links));

        }
        localStorage.removeItem('lglink');
        localStorage.removeItem('token');
        localStorage.removeItem('dareCreated');
        localStorage.removeItem('name');
        localStorage.removeItem('luser_id')
        that.setState({
          isLoggedIn: false,
          loader: false,
        });

        return;
      });
  }
  componentWillMount() {
    var link = window.location.href;
    var arrLink = link.split("/");
    var content = arrLink[arrLink.length - 1];
    if (content === "aboutus")
      this.setState({
        flg: false,
        abtflg: true,
        contactflg: false,
        loginflg: false
      })
    if (content === "contactus")
      this.setState({
        flg: false,
        abtflg: false,
        contactflg: true,
        loginflg: false
      })
    if (content === "login")
      this.setState({
        flg: false,
        abtflg: false,
        contactflg: false,
        loginflg: true
      })
    PubSub.subscribe("UPDATE_NAV_MENU", this.subscriberData.bind(this));
  }
  subscriberData(msg, data) {
    this.setState({
      isLoggedIn: true,
      name: data
    });

    localStorage.setItem("name", this.state.name);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  handleSelect(value) {
    this.setState({
      collapse: !this.state.collapse
    });

    switch (value) {
      case "1":
        this.setState({
          flg: true,
          abtflg: false,
          contactflg: false,
          loginflg: false
        });
        break;
      case "2":
        this.setState({
          flg: false,
          abtflg: true,
          contactflg: false,
          loginflg: false
        });
        break;
      case "3":
        this.setState({
          flg: false,
          abtflg: false,
          contactflg: true,
          loginflg: false
        });
        break;
      case "4":
        this.setState({
          flg: false,
          abtflg: false,
          contactflg: false,
          loginflg: true
        });
        break;
    }
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
      <Router>
        <div class="container">
          <Navbar color="white" expand="md" dark fixed="top">
            <NavbarBrand href="/"><img src={logo} style={{ width: "130px", height: "50px" }} /></NavbarBrand>
            {!this.state.isWideEnough && (
              <NavbarToggler style={{ backgroundColor: " grey" }} onClick={this.onClick} />
            )}
            <Collapse isOpen={this.state.collapse} navbar>
              <NavbarNav right>
                <NavItem
                  active={this.state.flg}
                  onClick={() => {
                    this.handleSelect("1");
                  }}
                >
                  <NavLink style={{ color: "black", }} className="nav-link" to="/">
                    <b>Home</b>
                  </NavLink>
                </NavItem>
                <NavItem
                  active={this.state.abtflg}
                  onClick={() => {
                    this.handleSelect("2");
                  }}
                >
                  <NavLink style={{ color: "black" }} className="nav-link" to="/aboutus">
                    <b> About Us</b>
                  </NavLink>
                </NavItem>
                <NavItem
                  active={this.state.contactflg}
                  onClick={() => {
                    this.handleSelect("3");
                  }}
                >
                  <NavLink style={{ color: "black" }} className="nav-link" to="/contactus">
                    <b> Contact Us</b>
                  </NavLink>
                </NavItem>
                {!(localStorage.getItem("token") != null) && (
                  <NavItem
                    active={this.state.loginflg}
                    onClick={() => {
                      this.handleSelect("4");
                    }}
                  >
                    <NavLink style={{ color: "black" }} className="nav-link" to="/login">
                      <b>LogIn/SignUp</b>
                    </NavLink>
                  </NavItem>
                )}
                {localStorage.getItem("token") != null && (
                  <Dropdown>
                    <DropdownToggle style={{ color: "black" }} nav caret>
                      <b> Hi {""}
                        {this.state.name != null
                          ? this.state.name
                          : localStorage.getItem("name")}</b>
                    </DropdownToggle>
                    <DropdownMenu>
                      {localStorage.getItem("name") === "Admin" ? (
                        <DropdownItem href="/adminquestion"><b>Menu</b></DropdownItem>
                      ) : localStorage.getItem("dareCreated") ? (
                        <DropdownItem href="/send_invite"><b>Menu</b></DropdownItem>
                      ) : (
                            <DropdownItem href="/user-question"><b>Menu</b></DropdownItem>
                          )}
                      <DropdownItem style={{ color: "black" }} href="/changepassword">
                        <b>Change Password</b>
                      </DropdownItem>
                      <DropdownItem style={{ paddingLeft: "0px" }}
                        href=""
                        onClick={this.btnLogout.bind(this)}
                      >  <Link to="/home" >
                          <b> Logout</b></Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </NavbarNav>
            </Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={About} />
          <Route path="/contactus" component={Contact} />
          <Route path="/invite/:dare_id" component={ResponsePlayer} />
          <Route path="/login" component={Login} />
          <Route path="/send_invite" component={ShareDare} />
          <Route path="/result" component={Result} />
          <Route path="/register" component={Register} />
          <Route path="/editquestion/:id" component={EditQuestion} />
          <Route path="/adminquestion" component={AdminQuestion} />
          <Route path="/score" component={ShowScore} />
          <Route path="/results" component={DareResult} />
          <Route path="/customquestion" component={CustomQuestion} />
          <Route path="/forgotpassword" component={ForgetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/temp" component={Temp} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/adminadd" component={Adminadd} />
          <Route path="/user-question" component={UserAdded} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/answers/:id" component={Answers} />
          <Route path="/verify_email/" component={VerifyEmail} />
          <Route path="/forget_password/" component={ForgetPasswordComponent} />
        </div>
      </Router>
    );
  }
}
