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
      link: ""
    };

    if (this.props.link != null) {
      this.state.link = this.props.link;
      localStorage.setItem("link", this.state.link);
      localStorage.setItem("user_id", this.props.user_id);
    } else {
      this.state.link = localStorage.getItem("link");
    }
    this.btnClickDelete = this.btnClickDelete.bind(this);
  }
  btnClickDelete() {
    var that = this;
    var user_id = localStorage.getItem("user_id");
    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/users/delete_dare/${user_id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {});
    if (localStorage.getItem("link") != null) {
      this.props.history.push("/user-question");
      localStorage.removeItem("dareCreated");
      localStorage.removeItem("link");
    } else {
      localStorage.clear();
      this.props.history.push("/");
    }
  }
  btnClickResult(e) {
    this.props.history.push("/userresults");
  }
  componentWillMount() {
    if (localStorage.length === 0) {
      this.props.history.push("/");
    } else {
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
                <Col md="8">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title text-center" color="primary-color">
                        <strong>Your Dare is ready!</strong>
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

                        <CopyToClipboard
                          text={this.state.link}
                          onCopy={() => this.setState({ copied: true })}
                        >
                          <button
                            style={{
                              width: "120px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize"
                            }}
                            class="btn btn-secondary btn-rounded"
                          >
                            Copy Link
                          </button>
                        </CopyToClipboard>

                        {this.state.copied ? (
                          <span style={{ color: "red" }}>Copied.</span>
                        ) : null}
                        <br />
                        <br />
                        <SocialShare link={this.state.link} />

                        <button
                          style={{
                            width: "120px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                          onClick={this.btnClickResult.bind(this)}
                          type="button"
                          class="btn btn-secondary btn-rounded"
                        >
                          See Result
                        </button>
                        <button
                          style={{
                            width: "130px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                          onClick={this.btnClickDelete}
                          type="button"
                          class="btn btn-warning btn-rounded"
                        >
                          Delete Dare
                        </button>
                      </div>
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
