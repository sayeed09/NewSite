import React from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

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
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
var color = '';
class ShowScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    }
  }
  btnFunc(e) {
    localStorage.removeItem('rflg');
    localStorage.removeItem('s');
    localStorage.removeItem('t');

    this.props.history.push("/home");
    return;
  }
  btnresult(e) {
    this.props.history.push("/result");
  }

  componentWillMount() {

    if (localStorage.getItem('s') != null && localStorage.getItem('t') != null) {
      var scores = (
        (localStorage.getItem("s") /
          localStorage.getItem("t")) *
        100
      ).toFixed(2);
      var score = parseInt(scores, 10)
      if (score < 40) {
        color = "red"
      }

      if (score >= 40 && score < 75) {
        color = "yellow"
      }
      if (score >= 75) {
        color = "green"
      }
    }
    else {
      this.props.history.push("/home")
    }
  }

  render() {
    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8" style={{ paddingLeft: '0', paddingRight: '0' }}>
            <Container>
              <Row>
                <Col md="10">
                  <div class="card">
                    <div class="card-body">
                      <div class="avatar mx-auto white">
                        <h5 class="text-center">
                          <strong>Congrats </strong>{" "}
                        </h5>
                      </div>
                      <br />

                      <div className="text-center">
                        <h6>
                          <strong>
                            {" "}
                            Your Score {localStorage.getItem("s")}/
                            {localStorage.getItem("t")}
                          </strong>
                        </h6>
                        <br />
                        <SemiCircleProgressBar stroke={color} percentage={(
                          (localStorage.getItem("s") /
                            localStorage.getItem("t")) *
                          100
                        ).toFixed(2)} showPercentValue />

                        <br /> <br />
                        <p>
                          Now, it’s your turn. Create your own challange and
                          send to your friends! Create Your Challenge{" "}
                        </p>
                        <button onClick={this.btnFunc.bind(this)}
                          style={{ backgroundColor: "#2E86C1", color: "white", borderRadius: "10px", textTransform: "none" }} class="btn btn-info"
                        > Create Your Challenge &nbsp; <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                        </button>
                        <br />
                        <a
                          style={{ color: "blue" }}
                          onClick={this.btnresult.bind(this)}
                        >
                          See all Results
                        </a>

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
export default ShowScore;
