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
  Grid
} from "mdbreact";
import "./Custom.css";
import ResponseDare from "./ResponseDare";
import loader from "./loader.gif";

class ResponsePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      name: "",
      showComponent: false,
      link: "",
      dareid: "",
      loader: true
    };

    this.state.link=window.location.href;
    //this.state.link = "https://glacial-tundra-88546.herokuapp.com/dare/147/test";
    localStorage.setItem("link", this.state.link);


    this.handleChange = this.handleChange.bind(this);
    this._onCreateButtonClick = this._onCreateButtonClick.bind(this);
  }
  componentWillMount() {

    if (localStorage.getItem('links') != null) {
      var retrievedData = localStorage.getItem('links');
      var links = JSON.parse(retrievedData);
      if (links.includes(window.location.href)) {
        if (localStorage.getItem('CPF')) {
          this.props.history.push("/invite");
          return;
        }
        else {
          this.props.history.push("/score");
          return;
        }

      }
    }
    if (localStorage.getItem('PL') != null) {
      var retrievedData = localStorage.getItem('PL');
      var links = JSON.parse(retrievedData);
      if (links.includes(window.location.href)) {
        if (localStorage.getItem('CPF')) {
          this.props.history.push("/invite");
          return;
        }
        else {
          this.props.history.push("/score");
          return;
        }

      }
    }

    localStorage.setItem('PF', true);



    const { dare_id } = this.props.match.params;
    this.state.dareid = this.props.match.params;

    var that = this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/dares/${dare_id}/test`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        that.setState({
          questionData: data,
          dare_name: data.name,
          loader: false
        });
      })
      .catch(function (error) {
        alert("Link Expired or Invalid")
        that.props.history.push("/home")
      });
  }



  handleChange(event) {
    this.setState({
      name: event.target.value,
      errors: ''
    });
  }

  _onCreateButtonClick() {
    if (this.state.name == "") {
      this.setState({
        errors: "Please enter name to continue"
      });
    } else {
      this.setState({
        showComponent: true
      });
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
      <div>
        {!this.state.showComponent && (
          <div class="contact-body">
            <div class="row">
              <div class="col-md-3" />
              <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
                <Container>
                  <Row>
                    <Col md="10">
                      <div class="card">
                        <div class="card-body">
                          <h5
                            class="card-title text-center"
                            style={{ fontSize: "30px" }}
                          >
                            <strong>
                              How Well Do You Know {this.state.dare_name} ?
                            </strong>
                          </h5>
                          <br />
                          <input
                            type="text"
                            placeholder="Enter your Name"
                            class="form-control"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                          <span
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginLeft: "3px"
                            }}
                          >
                            {this.state.errors}
                          </span>
                          <br />

                          <div class="text-center">
                            <Button class="btnClass" style={{ borderRadius: "25px", width: "150px", height: "50px", outline: "0" }} onClick={this._onCreateButtonClick}>
                              Play{" "}
                              <i class="fa fa-play-circle-o" aria-hidden="true"></i>{" "}
                            </Button>

                          </div>
                          <br />
                          <br />
                          <br />
                          <div>
                            <h4>Instructions: </h4>
                            <ul>
                              <li>Enter Your Name</li>
                              <li>Answer the Questions about your friend.</li>
                              <li>Check your score at the scoreboard.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div class="col-md-2" />
            </div>
          </div>
        )}
        {this.state.showComponent && (
          <ResponseDare
            history={this.props.history}
            questionData={this.state.questionData}
            link={this.state.link}
            name={this.state.name}
            dareid={this.state.dareid}
          />
        )}
      </div>
    );
  }
}

export default ResponsePlayer;
