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

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      questionNumber: 0,
      loader: true,
      obj: {},
      showNoResultComponent: false
    };
  }
  btnAnswerView(id, e) {
    this.props.history.push("/answers/" + id);
  }

  componentWillMount() {
    if (localStorage.getItem("rflg")) {
      this.setState({
        responseComponent: true
      });
    }
    else {
      this.props.history.push("/home")
    }
    var that = this;
    if (localStorage.getItem('PL') != null) {
      var retrievedData = localStorage.getItem('PL');
      var links = JSON.parse(retrievedData);
        var link = links[links.length - 1];
     // var link = "https://glacial-tundra-88546.herokuapp.com/dare/136/test";
      this.state.obj["link"] = link;
      var postData = this.state.obj;
      fetch(`https://pure-badlands-16289.herokuapp.com/api/users/result`, {
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
          that.setState({
            data: data.data,
            loader: false
          });
          if (data.data.length < 1) {
            that.setState({
              showNoResultComponent: true
            });
          }
        });
    }
    else {
      alert('Something went wrong');
    }
  }
  btnClick(e) {
    this.props.history.push("/score")
  }

  btnClickResponse(e) {
    this.props.history.push("/score");
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
          <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Container>
              <Row>
                <Col md="10">
                  <div class="card">
                    <div class="card-body">
                      <div class="avatar mx-auto white">
                        <h4
                          class="text-center"
                          style={{
                            margin: "0 auto",
                            width: "120px",
                            height: "40px",
                            paddingTop: "10px",
                            paddingRight: "20px"
                          }}
                        >
                          <strong>Results</strong>{" "}
                        </h4>
                      </div>
                      <br />
                      {!this.state.showNoResultComponent && (
                        <div className="text-center">
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Score</th>
                                <th scope="col">Answers</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => (
                                <tr>
                                  <td>{item.name}</td>
                                  <td>{item.score}</td>
                                  <td>
                                  <a onClick={this.btnAnswerView.bind(
                                      this,
                                      item.id
                                    )} style={{ color: 'blue', textDecoration: 'underline' }}><b>View</b></a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {this.state.showNoResultComponent && (
                        <div>
                          <h4 class="text-center">No Records Found</h4>


                        </div>
                      )}
                      {this.state.responseComponent && (
                        <div class="text-center">
                        <Button class="btn" style={{ borderRadius: "15px", width: "50", backgroundColor: "#2E86C1", color: "white" }} onClick={this.btnClickResponse.bind(this)}>
                          <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                          Back
                           </Button>
                         </div>
                      )}
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

export default Result;
