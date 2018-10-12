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
  View,
  TextField
} from "mdbreact";
import "./Custom.css";
import loader from "./loader.gif";
import EditQuestion from "./EditQuestion";

class AdminQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: "",
      loader: true,
      questionNumber: 0,
      editComponent: true
    };

    var that = this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/list`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          questionData: data,
          loader: false,
          editComponent: false
        });
      });
  }

  editButtonClick(item, e) {
    this.setState({
      editComponent: true,
      item: item
    });
    //this.props.history.push("/editquestion/"+item.question_id)
    //this.props.history.push({ pathname: "/editquestion", search: item.question_id });
  }

  btnClick(e) {
    this.setState({
      questionNumber: this.state.questionNumber + 1
    });
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
    } else {
      var answers;
      var i = -1;
      var that = this;

      var question = this.state.questionData.data.map(function(item) {
        return (
          <div>
            <table class="table ">
              <tbody>
                <tr>
                  <td>{item.question}</td>
                  <td>
                    <Button
                      style={{
                        width: "40px",
                        height: "30px",
                        padding: "0.65em"
                      }}
                      onClick={that.editButtonClick.bind(that, item)}
                    >
                      <i class="fa fa-pencil" aria-hidden="true" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{
                        width: "40px",
                        height: "30px",
                        padding: "0.65em"
                      }}
                    >
                      <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      });
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
                      <div class="avatar mx-auto white" />
                      {!this.state.editComponent && (
                        <div>
                          <br />
                          <h5
                            class="card-title text-center"
                            style={{ fontSize: "35px" }}
                          >
                            <strong />
                          </h5>
                          <div className="text-center">
                            <br />

                            {question}

                            <button
                              type="button"
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
                          </div>
                        </div>
                      )}
                      {this.state.editComponent && (
                        <EditQuestion data={this.state.item} />
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

export default AdminQuestion;
