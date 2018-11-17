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
import "react-sweet-progress/lib/style.css";
import ShowScore from "./ShowScore";
import { Progress } from "react-sweet-progress";

class ResponseDare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showResultComponent: false,
      name: "",
      AnswerArray: new Array(),
      resonseArray: new Array(),
      questionNumber: 0,
      cnt: 1,
      addClass: false,
      tmp: "",
      tmp1: "",
      score: 0,
      obj: {},
      per: "",
      responseData: {}
    };

    this.btnClick = this.btnClick.bind(this);
    this.setState({
      per: 100 / this.props.questionData.data.length
    });
  }


  onAnswerClick(selected_id, answer_id, question_id, e) {
    var chk = document.getElementsByClassName("green");
    var chk1 = document.getElementsByClassName("red");
    if (chk.item(0) != null || chk1.item(0) != null) {
      return;
    }
    this.setState({
      tmp: answer_id,
      tmp1: selected_id
    });
    this.state.responseData[question_id] = selected_id;

    var data = { questionId: question_id, AnswerId: selected_id };
    this.state.AnswerArray.push(data);
    if (answer_id == selected_id) {
      this.setState({
        score: this.state.score + 1
      });
      document.getElementById(answer_id).classList.add("green");
      return;
    } else {
      document.getElementById(selected_id).classList.add("red");
      document.getElementById(answer_id).classList.add("green");
    }
  }

  btnClick() {
    var chk = document.getElementsByClassName("green");
    var chk1 = document.getElementsByClassName("red");
    if (chk.item(0) === null && chk1.item(0) === null) {
      alert("Please select option");
      return;
    }
    if (this.state.tmp === this.state.tmp1) {
      document.getElementById(this.state.tmp).classList.remove("green");
    } else {
      document.getElementById(this.state.tmp).classList.remove("green");
      document.getElementById(this.state.tmp1).classList.remove("red");
    }

    if (this.state.questionNumber === this.props.questionData.data.length - 1) {
      this.state.obj["link"] = this.props.link;
      this.state.obj["score"] = this.state.score;
      this.state.obj["name"] = this.props.name;
      this.state.obj["answer_sheet"] = this.state.responseData;
      var postData = this.state.obj;
      var that = this;
      const { dare_id } = this.props.dareid;

      fetch(
        `https://pure-badlands-16289.herokuapp.com/api/dares/${dare_id}/score`,
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
        .then(function (data) { });
      this.setState({
        showResultComponent: true
      });
      localStorage.setItem("rflg", true);
      if (localStorage.getItem('links') != null) {
        var retrievedData = localStorage.getItem('links');
        var links = JSON.parse(retrievedData);
        links.push(window.location.href);
        localStorage.setItem('links', JSON.stringify(links));
      }
      else {
        var linkArr = [];
        linkArr.push(window.location.href);
        localStorage.setItem('links', JSON.stringify(linkArr));
      }
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      cnt: this.state.cnt + 1
    });
  }

  render() {

    var answers;
    var i = -1;
    var that = this;
    var question = this.props.questionData.data.map(function (item) {
      i = i + 1;
      if (i === that.state.questionNumber) {
        answers = item.options.map(function (val) {
          if (i === that.state.questionNumber) {
            return (
              <a
                onClick={that.onAnswerClick.bind(
                  that,
                  val.option_id,
                  item.answer_id,
                  item.question_id
                )}
              >
                {item.question_type === "text" ? (
                  <div id={val.option_id} class="answer-body">
                    {val.option_value}
                  </div>
                ) : (
                    <div>
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
                      <p>{val.caption}</p>
                    </div>
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
            {!this.state.showResultComponent && (
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
                          <Progress
                            percent={(
                              (this.state.questionNumber /
                                this.props.questionData.data.length) *
                              100
                            ).toFixed(2)}
                          />
                        </div>
                        <br />
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

            {localStorage.setItem("s", this.state.score)}
            {localStorage.setItem("t", this.props.questionData.data.length)}
            {this.state.showResultComponent && (
              <ShowScore history={this.props.history} link={this.props.link} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ResponseDare;
