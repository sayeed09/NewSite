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

class DareResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      questionNumber: 0,
      loader: true,
      obj: {},
      delObj: {},
      showNoResultComponent: false,
      deleteComponent: false
    };
    this.getData = this.getData.bind(this);
  }


  getData(e) {
    var that = this;
    this.state.obj["link"] = localStorage.getItem("link");
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
  componentWillMount() {
    this.getData();
  }
  btnAnswerView(id, e) {
    this.props.history.push("/answers/" + id);
  }
  btnDelete(id, e) {
    this.setState({ loader: true })
    var that = this;
    this.state.delObj["id"] = id;
    var postData = this.state.delObj;
    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/users/delete_result
    `,
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
      .then(function (data) {
        that.setState({
          loader: false,
          deleteComponent: true
        })
        that.getData.bind(that)
      });
  }
  btnClick(e) {
    this.props.history.push("/sharedare");
  }
  btnBackDeleteClick(e) {
    this.getData();
    this.setState({
      deleteComponent:false
    })
  }
  componentDidMount() {
    var table = document.getElementById('result-table')
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
                      {this.state.deleteComponent &&
                        <div class="text-center">
                          <div class="alert alert-success" role="alert">
                            Challenge Result Deleted Successfully
                          </div>
                          <Button class="btn" style={{ borderRadius: "15px", width: "50", backgroundColor: "#2E86C1", color: "white" }} onClick={this.btnBackDeleteClick.bind(this)}>
                            <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                            Back
                              </Button>
                        </div>}
                      {(!this.state.showNoResultComponent && !this.state.deleteComponent) && (
                        <div className="text-center">
                          <table class="table table-striped" style={{ display: "inline-block !important" }}>
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Score</th>
                                <th scope="col">Answers</th>
                                <th scope="col">Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => (
                                <tr>
                                  <td>{item.name}</td>
                                  <td>{item.score}</td>
                                  <td>


                                    {/* <i style={{ outline: "0" }} type="button" onClick={this.btnAnswerView.bind(
                                      this,
                                      item.id
                                    )} class="fa fa-eye btn btn-primary" aria-hidden="true"></i> */}
                                    <a onClick={this.btnAnswerView.bind(
                                      this,
                                      item.id
                                    )} style={{ color: 'blue', textDecoration: 'underline' }}><b>View</b></a>
                                  </td>
                                  <td>
                                    {/* <i type="button" onClick={this.btnDelete.bind(
                                      this,
                                      item.id
                                    )} class="fa fa-trash btn btn-danger" aria-hidden="true"></i> */}
                                    <a onClick={this.btnDelete.bind(
                                      this,
                                      item.id
                                    )} style={{ color: 'red', textDecoration: 'underline' }} class="delete"><b>Delete</b></a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button class="btn" style={{ borderRadius: "15px", width: "50", backgroundColor: "#2E86C1", color: "white" }} onClick={this.btnClick.bind(this)}>
                            <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>{" "}
                            Back
                              </Button>
                        </div>
                      )}
                      {this.state.showNoResultComponent && (
                        <div class="text-center">
                          <div class="alert alert-warning" role="alert">
                            No records found yet..!
                              </div>
                          <Button class="btn" style={{ borderRadius: "15px", width: "50", backgroundColor: "#2E86C1", color: "white" }} onClick={this.btnClick.bind(this)}>
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

export default DareResult;
