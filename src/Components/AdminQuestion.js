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
import { Tabs, Tab } from "react-bootstrap-tabs";
import Adminadd from "./Adminadd";
class AdminQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: "",
      loader: true,
      questionNumber: 0,
      editComponent: true
    };

    this.btnDelete = this.btnDelete.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentWillMount() {
    this.getData();
  }
  getData(e) {
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
  btnDelete(id, e) {
    this.setState({
      loader: true
    });
    var idd = id;
    var that = this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/${idd}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.props.history.push("/adminquestion");
        that.setState({
          a: 21,
          loader: false
        });
        that.getData();
        that.forceUpdate();
      });
  }
  editButtonClick(item, e) {
    this.props.history.push("/editquestion/" + item.question_id);
    //this.props.history.push({ pathname: "/editquestion", search: item.question_id });
  }
  handleSelect(e) {
    if (e === 1) {
      this.props.history.push("adminadd");
    }
    if(e===0){
      this.props.history.push("/adminquestion")
    }if(e===2){
      this.props.history.push("/admin")
    }
  }

  btnClick(e) {
    this.setState({
      questionNumber: this.state.questionNumber + 1
    });
  }
  btnAdd(e) {
    this.props.history.push("/adminadd");
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
                    <Button onClick={that.editButtonClick.bind(that, item)}>
                      <i class="fa fa-pencil" aria-hidden="true" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={that.btnDelete.bind(this, item.question_id)}
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
        <Tabs onSelect={this.handleSelect.bind(this)} selected="Questions">
        <Tab label="Questions" />
        <Tab label="Add Question" />
        <Tab label="Panel" />
        </Tabs><br />
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="10">
                  <div class="card">
                    <div class="card-body">
                      <div class="avatar mx-auto white" />
                      {!this.state.editComponent && (
                        <div>
                          <br />
                          <h4
                            class="card-title text-center"
                           
                          >
                            <strong />
                          </h4>
                          <div className="text-center">
                            <br />

                            {question}

                            <button
                              onClick={this.btnAdd.bind(this)}
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
