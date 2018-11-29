import common from "@material-ui/core/es/colors/common";
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
  Grid,
  View
} from "mdbreact";
import "./Custom.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "./NavBar";
import Result from "./Result";
import loader from "./loader.gif";
import SocialShare from "./SocialShare";

class ShareDare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      dareDeleteComponent: false,
      loader: false,
      btnText:'Copy Link'
    };

    if (localStorage.getItem('links') != null) {
      var retrievedData = localStorage.getItem('links');
      var links = JSON.parse(retrievedData);
      this.state.link = links[links.length - 1];
    }
    else {
      this.props.history.push("/home");
    }
    //this.state.link = localStorage.getItem("link");
  }

  btnClickDelete() {
    this.setState({
      link: ""
    })
    var that = this;
    var user_id = localStorage.getItem('token') != null ? localStorage.getItem('luser_id') : localStorage.getItem("user_id");
    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/users/delete_dare/${user_id}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data.message === "Dare has been deleted succesfully") {
          if (localStorage.getItem("token") != null) {
            localStorage.setItem("dareCreated", false);
            localStorage.removeItem("link");
          }
          else {
            localStorage.clear();
          }
          that.setState({
            dareDeleteComponent: true,
            link: "s"
          });

        }
        else {
          alert("Something went wrong..!")
        }
      });

  }
  btnBackClick(e) {
    if (localStorage.getItem("token") != null) {
      this.props.history.push("/user-question");
    } else {
      this.props.history.push("/home");
    }
  }
  btnClickResult(e) {
    this.props.history.push("/userresults");
  }
  componentWillMount() {
    if(!localStorage.getItem('CF')){
      this.props.history.push("/home");
    }


  }

  render() {
    if (this.state.link === "") {
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
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="10">
                  <div class="card">
                    <div class="card-body">
                      {!this.state.dareDeleteComponent &&
                        <div>
                          <h5 class="card-title text-center" color="primary-color">
                            <strong>Your Challenge is ready!</strong>
                          </h5>
                          <p class="text-center" style={{ fontSize: "15px" }}>
                            Share with your friends, and see who get maximum scores.
                      </p>
                          <br />

                          <div className="text-center">
                            <input
                              className="form-control"
                              value={this.state.link}
                              onChange={({ target: { value } }) =>
                                this.setState({ value, copied: false })
                              }
                            />
                            <br />

                            <CopyToClipboard
                              text={this.state.link}
                              onCopy={() => this.setState({btnText:'Copied' })}
                            >
                              <button style={{ color: "white", backgroundColor: "#605E5E", borderRadius: "10px", textTransform: "none" }} class="btn">
                               {this.state.btnText}
                          </button>
                            </CopyToClipboard>
                            <br />
                            <br />
                            <SocialShare link={this.state.link} />
                            <br />
                            <button
                              style={{ borderRadius: "10px", textTransform: "none" }} class="btn btn-primary"
                              onClick={this.btnClickResult.bind(this)}
                              type="button"

                            ><i class="fa fa-eye" aria-hidden="true"></i>
                              &nbsp; Result
                        </button>
                            <button onClick={this.btnClickDelete.bind(this)}
                              style={{ backgroundColor: "#2E86C1", color: "white", borderRadius: "10px", textTransform: "none" }} class="btn btn-danger"
                            ><i class="fa fa-trash" aria-hidden="true"></i>
                              &nbsp; Challenge
                        </button>
                          </div>
                        </div>
                      }
                      {this.state.dareDeleteComponent &&
                        <div class="text-center">
                          <div class="alert alert-success" role="alert">
                            Your Challenge has been deleted succesfully. Want to create new one ?
                            </div>
                          <Button class="btn" style={{ borderRadius: "25px", width: "191px", height: "50px", backgroundColor: "#2E86C1", color: "white", textTransform: "none" }} onClick={this.btnBackClick.bind(this)}>
                            Create Challenge{" "}
                            <i
                              class="fa fa-arrow-circle-o-right pr-2 pr-1"
                              aria-hidden="true"
                            />{" "}
                          </Button>
                        </div>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default ShareDare;
