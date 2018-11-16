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
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

class ShowScore extends React.Component {
  constructor(props) {
    super(props);
  }
  btnFunc(e) {
    this.props.history.push("/");
    localStorage.clear();
  }
  btnresult(e) {
    this.props.history.push("/results");
  }

  componentWillMount() {
    if (localStorage.getItem("rflg")) {
      this.props.history.push("/score");
      return;
    }
    if (localStorage.getItem("flag")) {
      this.props.history.push("/sharedare");
      return;
    }
  }

  render() {
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
                        <Progress
                          type="circle"
                          percent={(
                            (localStorage.getItem("s") /
                              localStorage.getItem("t")) *
                            100
                          ).toFixed(2)}
                        />
                        <br /> <br />
                        <p>
                          Now, it’s your turn. Create your own challange and
                          send to your friends! Create Your Dare{" "}
                        </p>
                        <button
                          style={{
                            width: "120px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                          onClick={this.btnFunc.bind(this)}
                          type="button"
                          class="btn btn-secondary btn-rounded"
                        >
                          Create Your Dare
                        </button>
                        <button
                          style={{
                            width: "120px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                          onClick={this.btnresult.bind(this)}
                          type="button"
                          class="btn btn-secondary btn-rounded"
                        >
                          See all results
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
export default ShowScore;
