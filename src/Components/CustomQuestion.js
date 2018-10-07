import React from "react";
import { string } from "prop-types";

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
      questions: new Array(2),
      answer: new Array(2),
      questionLength: 5,
      isPush: false
    };
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
    console.log(this.state.questions);
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

  render() {
    var questionArray = [];
    var optionsArray = [];
    var that = this;
    for (var i = 0; i < this.state.questionLength; i++) {
      questionArray.push(i);
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>questions</h4>

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
          var quesrions = optionsArray.map(function(options, optionId) {
            return (
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
            );
          });
          optionsArray = [];
          return (
            <div className="question">
              <input
                type="text"
                placeholder={`question ${idx + 1} `}
                value={question.name}
                onChange={that.handleQuestionNameChange.bind(that, idx)}
                class="form-control"
              />
              {quesrions}
              <button
                class="btn"
                type="button"
                onClick={that.handleAddOptions.bind(that, idx)}
                className="small"
              >
                Add options
              </button>
              {(idx + 1) % 5 === 0 && (
                <button
                  type="button"
                  onClick={that.handleRemoveQuestion(that, idx)}
                  className="small"
                >
                  -
                </button>
              )}
            </div>
          );
        })}
        <button
          class="btn"
          type="button"
          onClick={this.handleAddQuestion.bind(this)}
          className="small"
        >
          Add question
        </button>
        <button>Submit</button>
      </form>
    );
  }
}
export default CustomQuestion;
