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
    options: ["", "",]
  }
];
var answerIndx;

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
      loader: "",
      cnt: 0,
      answerIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
  }
  componentWillMount() {

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
    answerIndx = id;
    // this.setState({
    //answerIndex:id
    // })
    //questionModel[index].answer = questionModel[index].options[id];
  }

  handleQuestionNameChange(idx, e) {
    var isQuestionExits = questionModel.filter(function (item) {
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
    var lenght = questionModel.length;
    questionModel[this.state.cnt].answer = questionModel[this.state.cnt].options[answerIndx];

    if (this.state.cnt + 1 < questionModel.length) {
      for (var i = 0; i < (lenght - (this.state.cnt + 1)); i++) {
        questionModel.pop();
      }
    }
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
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data.link != null) {
          that.setState({
            loader: false,
            link: data.data.link
          });
          localStorage.setItem('dareCreated', true);
          // localStorage.setItem('user_id', data.data.user_id);
          if (localStorage.getItem('links') != null) {
            var retrievedData = localStorage.getItem('links');
            var links = JSON.parse(retrievedData);
            links.push(data.data.link);
            localStorage.setItem('links', JSON.stringify(links));
            localStorage.setItem('lglink', data.data.link);
          }
          else {
            var linkArr = [];
            linkArr.push(data.data.link);
            localStorage.setItem('links', JSON.stringify(linkArr));
          }
          localStorage.setItem("dareCreated", true);
          //localStorage.setItem('link', data.data.link);

          for (var i = 0; i < questionModel.length - 1; i++) {
            questionModel.pop();
          }
          that.props.history.push("/sharedare");
        }
        else {
          alert("Something went wrong, Please try again");
          that.props.history.push("/user-question")
        }
      })
      .catch(function (error) {
        alert("Server Error Please try again");
        return;
      });

  }

  handleAddQuestion(e) {
    {
      this.setState({
        cnt: this.state.cnt + 1
      })
    }
    if (this.state.questionLength < 20) {
      this.setState({ questionLength: this.state.questionLength + 5 });
    }

    var question = {
      question: "",
      answer: "",
      options: ["", ""]
    };
    questionModel.push(question);

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


  nextbtnClick(e) {
    e.preventDefault();

    questionModel[this.state.cnt].answer = questionModel[this.state.cnt].options[answerIndx];

    if (questionModel[this.state.cnt].question === "") {
      alert("Please enter the question")
      return;
    }
    if (questionModel[this.state.cnt].answer === "" || questionModel[this.state.cnt].answer == undefined) {
      alert("Please select the answer");
      return;
    }
    for (var i = 0; i < questionModel[this.state.cnt].options.length - 1; i++) {
      if (questionModel[this.state.cnt].options[i] === "" || questionModel[this.state.cnt].options[i] == undefined) {
        alert("Please fill the options");
        return;
      }
    }
    if (questionModel.length >= 5) {
      if (this.state.questionLength < 20) {
        this.setState({ questionLength: this.state.questionLength + 1 });
      }
    }
    if ((this.state.cnt >= 4) && (this.state.cnt + 1 == questionModel.length)) {
      var question = {
        question: "",
        answer: "",
        options: ["", ""]
      };
      questionModel.push(question);
    }



    this.setState({
      cnt: this.state.cnt + 1
    })

  }
  prevbtnClick(e) {

    e.preventDefault();
    this.setState({
      cnt: this.state.cnt - 1
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
                  <Col md="10">
                    <div class="card">
                      <div class="card-body">
                        <div class="avatar mx-auto white">
                          <h3 class="text-center">Question {this.state.cnt + 1} </h3>
                          <hr />
                        </div>
                        <br />
                        <form onSubmit={this.handleSubmit.bind(that)}>
                          {questionArray.map(function (question, idx) {

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
                            var quesrions = optionsArray.map(function (
                              options,
                              optionId
                            ) {
                              return (

                                <div>
                                  {that.state.cnt == idx &&
                                    <div class='row'>
                                      <div class='col-sm-1 col-md-1 col-lg-1 col-1 text-right'>
                                        <input
                                          required
                                          type="radio"
                                          name={idx}
                                          checked={questionModel[idx].answer !== "" ? (questionModel[idx].options[optionId] === questionModel[idx].answer) ? "checked" : null : null}
                                          value={questionModel[idx].answer === "" ? question.name : questionModel[idx].answer}
                                          onChange={that.handleChange.bind(
                                            that,
                                            idx,
                                            optionId
                                          )}
                                        />
                                      </div>
                                      <div class='col-sm-8 col-md-5 col-lg-5 col-8 text-left'>
                                        <input
                                          type="text"
                                          required
                                          placeholder={`Option ${optionId + 1} `}
                                          value={questionModel[idx].options[optionId] === "" ? question.name : questionModel[idx].options[optionId]}
                                          onChange={that.handleOptionName.bind(
                                            that,
                                            idx,
                                            optionId
                                          )}
                                          class="form-control"
                                        />
                                        <br />
                                      </div>
                                      <br />
                                    </div>
                                  }
                                </div>
                              );
                            });
                            optionsArray = [];
                            return (
                              <div className="question">
                                {that.state.cnt == idx &&
                                  <div>
                                    <input
                                      type="text"
                                      required
                                      placeholder={`Question ${idx + 1} `}
                                      value={questionModel[idx].question === "" ? question.name : questionModel[idx].question}
                                      onChange={that.handleQuestionNameChange.bind(
                                        that,
                                        idx
                                      )}
                                      class="form-control"
                                    />
                                    <br />
                                    {quesrions}
                                    {questionModel[idx].options.length < 6 &&
                                      <button
                                        style={{ borderRadius: '20px', height: '40px', width: '30px', backgroundColor: "#32c16c" }}
                                        onClick={that.handleAddOptions.bind(
                                          that,
                                          idx
                                        )}
                                        type="button" class="btn ">
                                        <i style={{ top: '0px', transform: 'translateX(-6px)' }} class="fa fa-plus" aria-hidden="true" />
                                        &nbsp; </button>
                                    }
                                    {questionModel[idx].options.length > 2 &&
                                      <button
                                        style={{ borderRadius: '20px', height: '40px', width: '30px', backgroundColor: "#cf2a39" }}
                                        type="button"
                                        onClick={() =>
                                          that.handleRemoveOption(that, idx)
                                        }
                                        class="btn"
                                      >
                                        <i style={{ top: '0px', transform: 'translateX(-6px)' }} class="fa fa-minus" aria-hidden="true" />
                                        &nbsp;
                                </button>
                                    }
                                    <br />

                                  </div>
                                }
                              </div>
                            );

                          })}

                          <div class="text-center">
                            {this.state.cnt > 0 &&
                              <button
                                onClick={this.prevbtnClick.bind(this)}
                                type="button"
                                class="btn" style={{ color: "white", backgroundColor: "#2E86C1", borderRadius: "10px", textTransform: "none" }}
                              >
                                <i class="fa fa-backward" aria-hidden="true"></i>&nbsp;  Previous
                             </button>

                            }
                            {this.state.cnt < 19 &&

                              <button
                                onClick={that.nextbtnClick.bind(that)}
                                type="button"
                                class="btn" style={{ color: "white", backgroundColor: "#2E86C1", borderRadius: "10px", textTransform: "none" }}
                              >
                                Next  &nbsp;<i class="fa fa-forward" aria-hidden="true"></i>
                              </button>

                            }
                            <br />
                            {(this.state.cnt >= 4) &&
                              <Button type="submit" outline color="secondary">
                                Submit  
                              </Button>
                            }
                          </div>

                        </form>





                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default CustomQuestion;
``