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

class UserAdded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {

    if (localStorage.getItem("token") === null) {
      this.props.history.push("/login");
      return;
    }
  }
  _onCreateButtonClick(e) {
    this.props.history.push("\customquestion");
  }
  render() {
    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Container>
              <Row>
                <Col md="10">
                  <div class="card">
                    <div class="card-body">
                      <div class="avatar mx-auto white">
                        <h5
                          class="card-title text-center"
                          style={{ fontSize: "30px" }}
                        >
                          <strong>
                            Challenge your friends, Create your own questions
                              </strong>
                        </h5>
                      </div>
                      <br />
                      <br />
                      <div>
                        <h5>Instructions: </h5>
                        <ul>
                          <li>
                            You can create only one dare at a time.
                          </li>
                          <li>
                            You can create your own 5 or 10 or 15 or 20
                            question.
                          </li>
                          <li>
                            For each question you will be having maximum 6
                            option and minimum 2.
                          </li>
                          <li>
                            You have to select one of the option as answer compulsory
                          </li>
                          <li>
                            At the end you will get a shareble link to share with your friends.
                          </li>
                          <li>
                            Check the score.
                          </li>
                        </ul>
                      </div>
                      <div class="text-center">
                      <Button class="btnClass" style={{ borderRadius: "25px", width: "175px", height: "50px", outline: "0" }} onClick={this._onCreateButtonClick.bind(this)}>
                        Create Challenge{" "}
                        <i
                          class="fa fa-arrow-circle-o-right pr-2 pr-1"
                          aria-hidden="true"
                        />{" "}
                      </Button>
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

export default UserAdded;
