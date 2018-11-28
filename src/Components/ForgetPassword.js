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
import loader from "./loader.gif";

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      obj: {},
      loader: false,
      mailSent: false,
      error: ''
    };
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value ,error:''});
  }
  btnPrevious(e) {
    this.props.history.push("/login");
  }
  submit(e) {
    this.setState({
      loader: true
    })
    e.preventDefault();
    var that = this;
    this.state.obj["email"] = this.state.email;
    var postData = this.state.obj;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/forget_password
    `, {
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
        })
        if (data.error === "User cannot be found") {
          that.setState({
            error: "Email not registered"
          })
        }
        if (data.message === "Link to change password is sent on your mail") {
          that.setState({
            mailSent: true
          })
        }
      })

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
        </div>);
    }
    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="8">
                  <Card>
                    <CardBody>
                      {!this.state.mailSent &&
                        <form onSubmit={this.submit.bind(this)}>
                          <p className="h4 text-center py-4">Forget Password </p>
                          <div className="grey-text">
                            <p>We will send you link to reset your password, therefore please ensure that you enter a valid email address.</p>
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
                              onChange={this.handleChange.bind(this)}
                            />
                            {this.state.error != "" &&
                              < div class="alert alert-danger" role="alert">
                                {this.state.error}
                              </div>
                            }
                            <div class="text-center">
                              <Button class="btn" style={{ borderRadius: "25px", width: "120px", height: "50px", outline: "0", backgroundColor: "#2E86C1", textTransform: "none" }} type="submit">
                                Submit
                            </Button>

                              <Button class="btn" style={{ borderRadius: "25px", width: "30", height: "50px", backgroundColor: "#2E86C1", color: "white", textTransform: "none" }} onClick={this.btnPrevious.bind(this)}>
                                <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                                Back
                              </Button>

                            </div>


                          </div>

                        </form>
                      }
                      {this.state.mailSent &&
                        <div>
                          <p className="h4 text-center py-4">Change your password..! </p>
                          <div class="alert alert-info" role="alert">
                            Please check your email we have sent you a link to change your password
                        </div>

                        </div>
                      }
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
export default ForgetPassword;
