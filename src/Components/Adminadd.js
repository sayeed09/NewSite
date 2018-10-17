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
import SimpleCrypto from "simple-crypto-js";
import loader from "./loader.gif";
import { Tabs, Tab } from "react-bootstrap-tabs";

class Adminadd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [""],
      question: "",
      id: "",
      obj: {},
      data: {},
      loader: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI() {
    return this.state.options.map((el, i) => (
      <div key={i}>
        <input
          required
          type="text"
          class="form-control"
          placeholder={`Option ${i + 1} `}
          value={el || ""}
          onChange={this.handleChange.bind(this, i)}
        />{" "}
        <br />
        <button
          type="button"
          onClick={this.removeClick.bind(this, i)}
          style={{
            width: "130px",
            height: "40px",
            padding: "0.65em",
            textTransform: "capitalize"
          }}
          class="btn btn-info"
        >
          <i class="fa fa-minus" aria-hidden="true" />
          &nbsp; Question
        </button>
        <br />
      </div>
    ));
  }
  onChangeText(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleChange(i, event) {
    let options = [...this.state.options];
    options[i] = event.target.value;
    this.setState({ options });
  }

  addClick() {
    this.setState(prevState => ({ options: [...prevState.options, ""] }));
  }

  removeClick(i) {
    let options = [...this.state.options];
    options.splice(i, 1);
    this.setState({ options });
  }

  handleSubmit(event) {
    this.setState({
      loader:true
    })
    this.state.obj["question"] = this.state.question;
    this.state.obj["options"] = this.state.options;
    this.state.data["data"] = this.state.obj;
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);
    this.state.data["auth_token"] = decipherText;
    var postData = this.state.data;
    var that=this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/questions`, {
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
        console.log(data)
        that.setState({
          loader:false
        })
        that.props.history.push("/adminquestion");
      })
      
  }
  handleSelect(e){
    if (e === 1) {
      this.props.history.push("adminadd");
    }
    if(e===0){
      this.props.history.push("/adminquestion")
    }if(e===2){
      this.props.history.push("/admin")
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
       <Tabs onSelect={this.handleSelect.bind(this)} selected="Add Question">
        <Tab label="Questions" />
        <Tab label="Add Question" />
        <Tab label="Panel" />
        </Tabs><br />
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="8">
                  <Card>
                    <CardBody>
                      <form onSubmit={this.handleSubmit.bind(this)}>
                      <p className="h4 text-center py-4"> Add Question </p>
                        <input
                          type="text"
                          placeholder="Question"
                          class="form-control"
                          required
                          value={this.state.question}
                          name="question"
                          onChange={this.onChangeText.bind(this)}
                        />
                        <br />
                        {this.createUI()}
                        <button
                          type="button"
                          onClick={this.addClick.bind(this)}
                          style={{
                            width: "130px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                          class="btn btn-info"
                        >
                          <i class="fa fa-plus" aria-hidden="true" />
                          &nbsp; options
                        </button>
                        <button
                          class="btn btn-info"
                          style={{
                            width: "130px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                        >
                          Submit
                        </button>
                      </form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
export default Adminadd;
