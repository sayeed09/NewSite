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
import loader from "./loader.gif";
import correctImg from "./correct.jpg";
import wrongImg from "./wrong.jpg";
class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
  }

  getData() {
    var that = this;
    const { id } = this.props.match.params;
    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/dares/view_answer_sheet/${id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          data: data.data,
          loader: false
        });
      });
  }
  componentWillMount() {
    this.getData();
  }
  btnCLick(e) {
    if (localStorage.getItem("rflg")) {
      this.props.history.push("/results");
    } else {
      this.props.history.push("/userresults");
    }
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
                          <strong>Answers</strong>{" "}
                        </h6>
                      </div>
                      <br />

                      <div className="text-center">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Ques. No</th>
                              <th scope="col">Chosed Option</th>
                              <th scope="col">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>

                                <td>
                                  {item.option_type === "text" ? (
                                    item.option
                                  ) : (
                                    <img
                                      style={{
                                        height: "30px",
                                        width: "30px",

                                        alignItems: "center"
                                      }}
                                      src={item.option}
                                    />
                                  )}
                                </td>
                                <td />
                                {item.is_correct ? (
                                  <img
                                    style={{
                                      height: "30px",
                                      width: "30px",
                                      marginTop: "10px",
                                      alignItems: "center"
                                    }}
                                    src={correctImg}
                                  />
                                ) : (
                                  <img
                                    style={{
                                      height: "30px",
                                      width: "30px",
                                      marginTop: "10px",
                                      alignItems: "center"
                                    }}
                                    src={wrongImg}
                                  />
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <button
                        onClick={this.btnCLick.bind(this)}
                        class="text-center"
                        style={{
                          width: "120px",
                          height: "40px",
                          padding: "0.65em",
                          marginLeft: "100px",
                          textTransform: "capitalize"
                        }}
                        type="button"
                        class="btn btn-secondary btn-rounded"
                      >
                        Back
                      </button>
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

export default Answers;
