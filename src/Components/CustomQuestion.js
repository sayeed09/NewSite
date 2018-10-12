import React from "react";
import { string } from "prop-types";
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
    options: []
  }
];

class CustomQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      answerOption:'',
      questions: new Array(2),
      answer: new Array(2),
      questionLength: 5,
      isPush: false
    };
    this.handleChange = this.handleChange.bind(this);
   
  }
  handleChange(event) {
    this.setState({
      answerOption: event.target.value
    });
  }
  

  handleQuestionNameChange(idx, e) {
    var isQuestionExits = questionModel.filter(function(item) {
      return item.questionID === idx.toString();
    });
    if (isQuestionExits.length === 0) {
      var question = {
        questionID: "",
        question: "",
        answer: "",
        options: []
      };
      questionModel.push(question);
    }
    if (e.target.value !== "") {
      questionModel[idx].questionID = idx.toString();
      (questionModel[idx].question = e.target.value.toString()),
        (questionModel[idx].answer = ""),
        (questionModel[idx].options = []);
    }
  }

  handleSubmit = evt => {
    const { name, questions } = this.state;
  };

  handleAddQuestion(e) {
    if (this.state.questionLength < 20) {
      this.setState({ questionLength: this.state.questionLength + 5 });
    }
  }

  handleAddOptions(index, e) {
    var data = questionModel;

    var isQuestionExits = questionModel.filter(function(item) {
      return item.questionID === index.toString();
    });
    if (isQuestionExits.length > 1) {
      if (isQuestionExits.length < 6) {
        var emptyArray = new Array(2);
        for (var i = 0; i < 2; i++) {
          questionModel[index].options.push("");
        }
      }
    } else {
      if (questionModel.length <= index) {
        var limit = index - questionModel.length + 1;
        for (var i = 0; i < limit; i++) {
          var question = {
            questionID: "",
            question: "",
            answer: "",
            options: []
          };
          questionModel.push(question);
        }
      }
      if (questionModel.length >= 1 || index === 0) {
        if (questionModel[index].options.length < 6) {
          if (questionModel[index].options.length === 0) {
            for (var i = 0; i < 4; i++) {
              questionModel[index].options.push("");
            }
          } else {
            for (var i = 0; i < 2; i++) {
              questionModel[index].options.push("");
            }
          }
        }
      }
    }

    this.setState({ a: 45 });
  }

  handleRemoveQuestion = idx => () => {
    if (this.state.questionLength > 5) {
      this.setState({ questionLength: this.state.questionLength - 5 });
    }
  };
  handleRemoveOption(idx,e){

    
  }
  render() {
    var questionArray = [];
    var optionsArray = [];
    var that = this;
    for (var i = 0; i < this.state.questionLength; i++) {
      questionArray.push(i);
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
                      <form onSubmit={this.handleSubmit}>

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
                                type="text"
                                placeholder={`options ${optionId + 1} `}
                                value={question.name}
                                onChange={that.handleQuestionNameChange.bind(
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
                                 onClick={that.handleRemoveOption(that, idx)}
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
                                onClick={that.handleAddOptions.bind(that, idx)}
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
                                 onClick={that.handleRemoveQuestion(that, idx)}
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
      </div>
    );
  }
}
export default CustomQuestion;
