import React from "react";
import { string } from "prop-types";
import SimpleCrypto from "simple-crypto-js";
import Sharedare from "./ShareDare";
import loader from "./loader.gif";

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
const questionModel = [
  {
    questionID: "",
    question: "",
    answer: "",
    options: ["", ""]
  }
];

class CustomQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      answerOption: "",
      questions: new Array(2),
      answer: new Array(2),
      questionLength: 5,
      isPush: false,
      obj: {},
      shareComponent: false,
      loader: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
  }
  componentWillMount() {
    if(localStorage.getItem('dareCreated')){
      this.props.history.push("/sharedare")
    }
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/login");
      return;
    }

    for (var i = 0; i < 4; i++) {
      var question = {
        question: "",
        answer: "",
        options: ["", ""]
      };
      questionModel.push(question);
    }
  }
  handleOptionName(index, optidx, e) {
    if (e.target.value !== "") {
      questionModel[index].options[optidx] = e.target.value.toString();
    }
  }
  handleChange(index, id, event) {
    questionModel[index].answer = questionModel[index].options[id];
  }

  handleQuestionNameChange(idx, e) {
    var isQuestionExits = questionModel.filter(function(item) {
      return item.questionID === idx.toString();
    });

    if (e.target.value !== "") {
      questionModel[idx].questionID = idx.toString();
      (questionModel[idx].question = e.target.value.toString()),
        (questionModel[idx].answer = ""),
        (questionModel[idx].options = []);
    }
  }

  handleSubmit(e) {
    this.setState({
      loader: true
    });
    e.preventDefault();
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);

    this.state.obj["auth_token"] = decipherText;
    this.state.obj["data"] = questionModel;

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
        if (data.data.link != null) {
          that.setState({
            shareComponent: true,
            loader: false,
            link:data.data.link
          });
          localStorage.setItem('dareCreated',true);
          localStorage.setItem('user_id', data.data.user_id);
          localStorage.setItem('link', data.data.link);
        }
      })
      .catch(function(error) {
        alert("Server Error Please try again");
        return;
      });
  }

  handleAddQuestion(e) {
    console.log(questionModel);
    if (this.state.questionLength < 20) {
      this.setState({ questionLength: this.state.questionLength + 5 });
    }
    for (var i = 0; i < 5; i++) {
      var question = {
        question: "",
        answer: "",
        options: ["", ""]
      };
      questionModel.push(question);
    }
    console.log(questionModel);
  }
  handleRemoveOption(e, idx) {
    for (var i = 0; i < 2; i++) {
      questionModel[idx].options.pop();
    }
    this.setState({
      a: 4
    });
  }

  handleAddOptions(index, e) {
    if (questionModel[index].options.length < 6) {
      for (var i = 0; i < 2; i++) {
        questionModel[index].options.push("");
      }
      this.setState({
        a: 4
      });
    }
  }

  handleRemoveQuestion = idx => () => {
    for (var i = 0; i < 5; i++) {
      questionModel.pop();
    }
    if (this.state.questionLength > 5) {
      this.setState({ questionLength: this.state.questionLength - 5 });
    }
  };

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
    var questionArray = [];
    var optionsArray = [];
    var that = this;
    for (var i = 0; i < this.state.questionLength; i++) {
      questionArray.push(i);
    }
    return (
      <div class="contact-body">
        {!this.state.shareComponent && (
          <div class="row">
            <div class="col-md-3" />
            <div class="col-md-8">
              <Container>
                <Row>
                  <Col md="8">
                    <div class="card">
                      <div class="card-body">
                        <div class="avatar mx-auto white">
                          <h5
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
                            <strong>Add Question</strong>{" "}
                          </h5>
                        </div>
                        <br />
                        <form onSubmit={this.handleSubmit.bind(that)}>
                          {questionArray.map(function(question, idx) {
                            if (
                              questionModel.length - 1 <= idx &&
                              questionModel[0].options.length === 0
                            ) {
                              for (var i = 0; i < 2; i++) {
                                optionsArray.push(i);
                              }
                            } else {
                              if (questionModel.length - 1 >= idx) {
                                var limit = 2;
                                if (questionModel[idx].options.length > 0) {
                                  limit = questionModel[idx].options.length;
                                }
                                for (var i = 0; i < limit; i++) {
                                  optionsArray.push(i);
                                }
                              } else {
                                for (var i = 0; i < 2; i++) {
                                  optionsArray.push(i);
                                }
                              }
                            }
                            var quesrions = optionsArray.map(function(
                              options,
                              optionId
                            ) {
                              return (
                                <div>
                                  <input
                                    required
                                    type="radio"
                                    name={idx}
                                    value={question.name}
                                    onChange={that.handleChange.bind(
                                      that,
                                      idx,
                                      optionId
                                    )}
                                  />
                                  <input
                                    type="text"
                                    placeholder={`options ${optionId + 1} `}
                                    value={question.name}
                                    onChange={that.handleOptionName.bind(
                                      that,
                                      idx,
                                      optionId
                                    )}
                                    class="form-control"
                                  />

                                  <br />
                                </div>
                              );
                            });
                            optionsArray = [];
                            return (
                              <div className="question">
                                <input
                                  type="text"
                                  placeholder={`question ${idx + 1} `}
                                  value={question.name}
                                  onChange={that.handleQuestionNameChange.bind(
                                    that,
                                    idx
                                  )}
                                  class="form-control"
                                />
                                <br />
                                {quesrions}

                                <button
                                  type="button"
                                  onClick={() =>
                                    that.handleRemoveOption(that, idx)
                                  }
                                  style={{
                                    width: "130px",
                                    height: "40px",
                                    padding: "0.65em",
                                    textTransform: "capitalize"
                                  }}
                                  class="btn btn-info"
                                >
                                  <i class="fa fa-minus" aria-hidden="true" />
                                  &nbsp; Option
                                </button>

                                <button
                                  type="button"
                                  onClick={that.handleAddOptions.bind(
                                    that,
                                    idx
                                  )}
                                  style={{
                                    width: "130px",
                                    height: "40px",
                                    padding: "0.65em",
                                    textTransform: "capitalize"
                                  }}
                                  class="btn btn-info"
                                >
                                  <i class="fa fa-plus" aria-hidden="true" />
                                  &nbsp; options
                                </button>

                                <br />
                                {(idx + 1) % 5 === 0 && (
                                  <button
                                    type="button"
                                    onClick={that.handleRemoveQuestion(
                                      that,
                                      idx
                                    )}
                                    style={{
                                      width: "130px",
                                      height: "40px",
                                      padding: "0.65em",
                                      textTransform: "capitalize"
                                    }}
                                    class="btn btn-info"
                                  >
                                    <i class="fa fa-minus" aria-hidden="true" />
                                    &nbsp; Question
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            onClick={this.handleAddQuestion.bind(this)}
                            style={{
                              width: "130px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize"
                            }}
                            class="btn btn-info"
                          >
                            <i class="fa fa-plus" aria-hidden="true" />
                            &nbsp; Question
                          </button>
                          <br />
                          <button
                            class="btn btn-info"
                            style={{
                              width: "130px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize"
                            }}
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
        {this.state.shareComponent && <Sharedare link={this.state.link} history={this.props.history} />}
      </div>
    );
  }
}
export default CustomQuestion;
