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
      delObj:{},
      showNoResultComponent: false
    };
    this.getData=this.getData.bind(this);
  }

  
getData(e){
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
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
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
  btnDelete(id, e) {
    this.setState({loader:true})
    var that = this;
    this.state.delObj["id"]=id;
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
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          loader:false
        })
        that.getData.bind(that)
      });
  }
  btnClick(e) {
    this.props.history.push("/sharedare");
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
                          <strong>Results</strong>{" "}
                        </h6>
                      </div>
                      <br />
                      {!this.state.showNoResultComponent && (
                        <div className="text-center">
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Score</th>
                                <th scope="col">Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => (
                                <tr>
                                  <td>{item.name}</td>
                                  <td>{item.score}</td>
                                  <td>
                                    <Button
                                      onClick={this.btnDelete.bind(
                                        this,
                                        item.id
                                      )}
                                      class="btn btn-secondary btn-rounded"
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <button
                            style={{
                              width: "120px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize"
                            }}
                            onClick={this.btnClick.bind(this)}
                            type="button"
                            class="btn btn-secondary btn-rounded"
                          >
                            Back
                          </button>
                        </div>
                      )}
                      {this.state.showNoResultComponent && (
                        <div>
                          <h4 class="text-center">No Records Found</h4>
                          <button
                            style={{
                              width: "120px",
                              height: "40px",
                              padding: "0.65em",
                              textTransform: "capitalize",
                              marginLeft: "100px"
                            }}
                            onClick={this.btnClick.bind(this)}
                            type="button"
                            class="btn btn-secondary btn-rounded"
                          >
                            Back
                          </button>
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
