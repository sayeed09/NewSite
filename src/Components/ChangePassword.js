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
import SimpleCrypto from "simple-crypto-js";
import loader from "./loader.gif";
var md5 = require("md5");

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpassword: "",
      cnfnewpassword: "",
      errors: "",
      obj: {},
      loader: false
    };
  }
  btnBackClick(e) {
    if (!localStorage.getItem("dareCreated")) {
      this.props.history.push("/invite");
    } else {
      this.props.history.push("/user-question");
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  submit(e) {
    e.preventDefault();
    if (this.state.cnfnewpassword != this.state.newpassword) {
      this.setState({
        errors: "Password and Confirm Password are not same"
      });
      return;
    } else {
      this.setState({
        loader: true
      });
      var postData = this.state.obj;
      var that = this;
      var _secretKey = "thekeyof12NewSite";
      var simpleCrypto = new SimpleCrypto(_secretKey);
      var chiperText = localStorage.getItem("token");
      var decipherText = simpleCrypto.decrypt(chiperText);

      this.state.obj["auth_token"] = decipherText;
      this.state.obj["old_password"] = md5(this.state.oldpassword);
      this.state.obj["new_password"] = md5(this.state.newpassword);
      var postData = this.state.obj;
      fetch(
        `https://pure-badlands-16289.herokuapp.com//api/users/change_password`,
        {
          method: "post",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          that.setState({
            data: data,
            loader: true
          });
          if (that.state.data.error != null) {
            that.setState({
              errors: "Please enter correct old password",
              loader: false
            });
          } else {
            alert("Your password changed successfully")
            if (localStorage.getItem("dareCreated")) {
              that.props.history.push("/invite");
            } else {
              that.props.history.push("/user-question");
            }
          }
        });
    }
  }
  componentWillMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/login");
      return;
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
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Container>
              <Row>
                <Col md="10">
                  <Card>
                    <CardBody>
                      <form onSubmit={this.submit.bind(this)}>
                        <p className="h4 text-center py-4"> Change Password </p>
                        <div className="grey-text">
                          <Input
                            label="Old password"
                            icon="lock"
                            group
                            type="password"
                            name="oldpassword"
                            validate
                            required
                            value={this.state.oldpassword}
                            onChange={this.handleChange.bind(this)}
                          />
                          <Input
                            label="New password"
                            icon="lock"
                            group
                            type="password"
                            name="newpassword"
                            validate0
                            required
                            value={this.state.newpassword}
                            onChange={this.handleChange.bind(this)}
                          />
                          <Input
                            label="Confirm New password"
                            icon="lock"
                            group
                            type="password"
                            name="cnfnewpassword"
                            validate
                            required
                            value={this.state.cnfnewpassword}
                            onChange={this.handleChange.bind(this)}
                          />
                          {this.state.errors != "" &&
                            <div class="alert alert-danger" role="alert">
                              {this.state.errors}
                            </div>}

                          <br />
                          <div class="text-center">
                            <Button class="btn" style={{ borderRadius: "25px", width: "120px", height: "50px", outline: "0", backgroundColor: "#2E86C1", textTransform: "none" }} type="submit">
                              Change
                            </Button>

                            <Button class="btn" style={{ borderRadius: "25px", width: "30", height: "50px", backgroundColor: "#2E86C1", color: "white", textTransform: "none" }} onClick={this.btnBackClick.bind(this)}>
                              <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                              Back
                              </Button>
                          </div>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
