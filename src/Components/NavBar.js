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
      obj: {}
    };
    this.onClick = this.onClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  btnLogout(e) {
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);
    this.state.obj["auth_token"] = decipherText;
    var postData = this.state.obj;
    var that = this;
    localStorage.clear();
    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/logout`, {
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
        that.setState({
          isLoggedIn: false
        });

        return;
      });
  }
  componentWillMount() {
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
    return (
      <Router>
        <div class="container">
          <Navbar color="light blue" expand="md" dark fixed="top">
            <NavbarBrand href="/">NewSite</NavbarBrand>
            {!this.state.isWideEnough && (
              <NavbarToggler onClick={this.onClick} />
            )}
            <Collapse isOpen={this.state.collapse} navbar>
              <NavbarNav right>
                <NavItem
                  active={this.state.flg}
                  onClick={() => {
                    this.handleSelect("1");
                  }}
                >
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem
                  active={this.state.abtflg}
                  onClick={() => {
                    this.handleSelect("2");
                  }}
                >
                  <NavLink className="nav-link" to="/aboutus">
                    About us
                  </NavLink>
                </NavItem>
                <NavItem
                  active={this.state.contactflg}
                  onClick={() => {
                    this.handleSelect("3");
                  }}
                >
                  <NavLink className="nav-link" to="/contactus">
                    Contact us
                  </NavLink>
                </NavItem>
                {!(localStorage.getItem("token") != null) && (
                  <NavItem
                    active={this.state.loginflg}
                    onClick={() => {
                      this.handleSelect("4");
                    }}
                  >
                    <NavLink className="nav-link" to="/login">
                      LogIn/SignUp
                    </NavLink>
                  </NavItem>
                )}
                {localStorage.getItem("token") != null && (
                  <Dropdown>
                    <DropdownToggle nav caret>
                      Hi {""}
                      {this.state.name != null
                        ? this.state.name
                        : localStorage.getItem("name")}
                    </DropdownToggle>
                    <DropdownMenu>
                      {localStorage.getItem("name") === "Admin" ? (
                        <DropdownItem href="/adminquestion">Menu</DropdownItem>
                      ) : localStorage.getItem("dareCreated") ? (
                        <DropdownItem href="/sharedare">Menu</DropdownItem>
                      ) : (
                        <DropdownItem href="/user-question">Menu</DropdownItem>
                      )}
                      <DropdownItem href="/changepassword">
                        Change Password
                      </DropdownItem>
                      <DropdownItem
                        href="/login"
                        onClick={this.btnLogout.bind(this)}
                      >
                        Logout
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
          <Route path="/dare/:dare_id" component={ResponsePlayer} />
          <Route path="/login" component={Login} />
          <Route path="/sharedare" component={ShareDare} />
          <Route path="/results" component={Result} />
          <Route path="/register" component={Register} />
          <Route path="/editquestion/:id" component={EditQuestion} />
          <Route path="/adminquestion" component={AdminQuestion} />
          <Route path="/score" component={ShowScore} />
          <Route path="/userresults" component={DareResult} />
          <Route path="/customquestion" component={CustomQuestion} />
          <Route path="/forgotpassword" component={ForgetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/temp" component={Temp} />
          <Route path="/changepassword" component={ChangePassword} />
          <Route path="/adminadd" component={Adminadd} />
          <Route path="/user-question" component={UserAdded} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/answers/:id" component={Answers} />
        </div>
      </Router>
    );
  }
}
