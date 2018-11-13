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
import home from "./home.jpg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SocialShare from "./SocialShare";
import Result from "./Result";
import { Progress } from "react-sweet-progress";
import loader from "./loader.gif";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showDareComponent: false,
      name: "",
      AnswerArray: [],
      questionNumber: 0,
      cnt: 1,
      tmp: "",
      tmp1: 0,
      showDeleteComponent: false,
      showResultComponent: false,
      obj: {},
      loader: false
    };

    this.handleChange = this.handleChange.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onPreviousButtonClick = this._onPreviousButtonClick.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.btnClickDelete = this.btnClickDelete.bind(this);
    this.btnClickResult = this.btnClickResult.bind(this);
  }
  _onButtonClick() {
    this.setState({
      showComponent: true
    });
  }
  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }
  _onPreviousButtonClick() {
    this.setState({
      showComponent: false
    });
  }

  onAnswerClick(option_id, question_id, e) {
    this.setState({
      option_id: option_id,
      question_id: question_id
    });
    if (this.state.tmp1 === 0) {
      this.setState({
        tmp1: this.state.tmp1 + 1
      });
    }
    var blue_div = document.getElementsByClassName("blue-option");
    if (blue_div.item(0) !== null) {
      blue_div.item(0).classList.remove("blue-option");
    }
    document.getElementById(option_id).classList.add("blue-option");
  }
  btnClick() {
    var chk = document.getElementsByClassName("blue-option");
    if (chk.item(0) === null) {
      alert("Please select option");
      return;
    }
    var data = {
      question_id: this.state.question_id,
      option_id: this.state.option_id
    };
    this.state.AnswerArray.push(data);
    document
      .getElementById(this.state.option_id)
      .classList.remove("blue-option");
    if (this.state.questionNumber === this.props.questionData.data.length - 1) {
      this.setState({
        loader: true
      });
      this.state.obj["user_id"] = this.props.userData;
      this.state.obj["data"] = this.state.AnswerArray;

      var that = this;
      var postData = this.state.obj;
      fetch(`https://pure-badlands-16289.herokuapp.com/api/dares`, {
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
            link: data.data.link,
            loader: false
          });
        })
        .catch(function(error) {
          alert("Server Error Please try again");
          return;
        });
      localStorage.setItem("flag", true);
      this.setState({
        showDareComponent: true
      });
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      cnt: this.state.cnt + 1
    });
  }

  btnClickDelete(e) {
    var that = this;
    var user_id = this.props.userData;

    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/users/delete_dare/${user_id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {});
    localStorage.clear();
    this.props.history.push("/home");
  }
  btnClickResult(e) {
    this.props.history.push("/userresults");
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
    var ques = this.props.questionData;
    var answers;
    var i = -1;
    var that = this;

    var question = ques.data.map(function(item) {
      i = i + 1;
      if (i === that.state.questionNumber) {
        answers = item.options.map(function(val) {
          if (i === that.state.questionNumber) {
            return (
              <a
                onClick={that.onAnswerClick.bind(
                  that,
                  val.option_id,
                  item.question_id
                )}
              >
                {item.question_type === "text" ? (
                  <div id={val.option_id} class="answer-body">
                    {val.option_value}
                  </div>
                ) : (
                  <img
                    id={val.option_id}
                    class="answer-body"
                    style={{
                      height: "150px",
                      width: "200px",
                      padding: "20px"
                    }}
                    src={val.option_value}
                  />
                )}
              </a>
            );
          }
        });
        return <div>{item.question}</div>;
      }
    });

    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            {!this.state.showDareComponent && (
              <Container>
                <Row>
                  <Col md="8">
                    <div class="card">
                      <div class="card-body">
                        <div class="avatar mx-auto white">
                          <h6
                            class="text-center"
                            style={{
                              fontSize: "15px",
                              margin: "0 auto",
                              width: "120px",
                              height: "40px",
                              paddingTop: "10px",
                              paddingRight: "20px"
                            }}
                          >
                            <strong>
                              Question {this.state.questionNumber + 1} /{" "}
                              {this.props.questionData.data.length}{" "}
                            </strong>{" "}
                          </h6>
                        </div>
                        <br />
                        <Progress
                          percent={(
                            (this.state.questionNumber /
                              this.props.questionData.data.length) *
                            100
                          ).toFixed(2)}
                        />
                        <h5
                          class="card-title text-center"
                          style={{ fontSize: "35px" }}
                        >
                          <strong>{question}</strong>
                        </h5>
                        <div className="text-center">
                          <br />
                          {answers}
                          <button
                            onClick={this.btnClick}
                            type="button"
                            class="btn btn-secondary btn-rounded"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
            {this.state.showDareComponent && (
              <Container>
                <Row>
                  <Col md="8">
                    <div class="card">
                      <div class="card-body">
                        <h5
                          class="card-title text-center"
                          color="primary-color"
                        >
                          <strong>Your Dare is ready!</strong>
                        </h5>
                        <p class="text-center" style={{ fontSize: "15px" }}>
                          Share with your friends, and see who get maximum
                          scores.
                        </p>
                        <br />

                        <div className="text-center">
                          <input
                            value={this.state.link}
                            className="form-control"
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
                            See result
                          </button>
                          <button
                            style={{
                              width: "120px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize"
                            }}
                            onClick={this.btnClickDelete.bind(this)}
                            type="button"
                            class="btn btn-warning btn-rounded"
                          >
                            Delete dare
                          </button>

                          {localStorage.setItem("link", this.state.link)}
                          {localStorage.setItem("user_id", this.props.userData)}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
