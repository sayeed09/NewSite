import React from "react";
import loader from "./loader.gif";
import temp from "./temp";
import SimpleCrypto from "simple-crypto-js";
import axios from "axios";
import "./Custom.css";
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
const CLOUDINARY_UPLOAD_PRESET = "swfktg2j";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dd0xblcox/image/upload";

const options = [
  {
    option_id: "",
    option: ""
  }
];
class EditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionArray: [],
      optionIdArray: [],
      captionArray: [],
      options: [""],
      question: "",
      id: "",
      loader: true,
      cnt: 0,
      answerArray: [],
      qid: "",
      obj: {},
      resultObj: {},
      imageOptionsLink: [],
      tmp: 0
    };
    this.onChangeOption = this.onChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({ qid: this.props.match.params });
    console.log(this.state.qid);
    var that = this;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/${id}/edit`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          questionName: data.data.question,
          idd: data.data.question_id,
          options: data.data.options,
          loader: false,
          question_type: data.data.question_type
        });
        console.log(data);
      });
  }
  btnBackClick(e) {
    this.props.history.push("/adminquestion");
  }
  handleImageUpload(e, file, i) {
    var ins = i + 1;
    this.setState({
      loader: true
    });
    var that = this;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_UPLOAD_URL,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: formData
    })
      .then(function(data) {
        that.state.imageOptionsLink[i] = data.data.secure_url;
        this.state.optionArray[i] = data.data.secure_url;
        that.setState({
          loader: false
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  componentDidMount() {}
  fileChangedHandler(i, e) {
    if (e.target.files[0].size / 1024 / 1024 > 4) {
      alert("please select image less than 4Mb");
      return;
    }
    /* var parts = e.target.files[0].split('.');
     return parts[parts.length - 1];
     var ext = getExtension(filename);
     switch (ext.toLowerCase()) {
     case 'jpg':
     case 'png':
     case 'jpeg':
         //etc
         return true;
     }
     return false;
 */

    this.setState({
      selectedFile: e.target.files[0]
    });

    this.handleImageUpload(this, e.target.files[0], i);
  }
  onChangeText(e) {
    this.setState({ questionName: e.target.value });
  }

  handleSubmit(event) {
    this.setState({
      loader: true
    });

    if (this.state.question_type === "text") {
    }
    for (var i = 0; i < this.state.optionArray.length; i++) {
      if (this.state.question_type === "text") {
        var optionModel = {
          option_id: this.state.optionIdArray[i],
          option: this.state.optionArray[i]
        };
      } else {
        var optionModel = {
          option_id: this.state.optionIdArray[i],
          option: this.state.optionArray[i],
          caption: this.state.captionArray[i]
        };
        this.state.answerArray.push(optionModel);
      }
      if (localStorage.getItem("token") === null) {
        alert("Please Login again");
        this.props.history.push("/login");
        return;
      } else {
        this.state.obj["question_id"] = this.state.idd;
        this.state.obj["question_type"] = this.state.question_type;
        this.state.obj["question"] = this.state.questionName;
        this.state.obj["options"] = this.state.answerArray;
        this.state.resultObj["data"] = this.state.obj;
        var _secretKey = "thekeyof12NewSite";
        var simpleCrypto = new SimpleCrypto(_secretKey);
        var chiperText = localStorage.getItem("token");
        var decipherText = simpleCrypto.decrypt(chiperText);
        this.state.resultObj["auth_token"] = decipherText;

        const { id } = this.props.match.params;
        var that = this;
        var postData = this.state.resultObj;
        fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/${id}`, {
          method: "PATCH",
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
              loader: false
            });
            that.props.history.push("/adminquestion");
            console.log(data);
          });
        event.preventDefault();
      }
    }
  }
  onChangeOption(idx, e) {
    this.state.optionArray[idx] = e.target.value;
    this.setState({
      a: 45
    });
  }
  onChangeCaption(idx, e) {
    this.state.captionArray[idx] = e.target.value;
    this.setState({
      a: 45
    });
  }
  componentWillUnmount() {
    this.setState({
      cnt: 0
    });
  }
  render() {
    var that = this;
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
    if (this.state.cnt === 0) {
      var that = this;
      if (this.state.question_type === "text") {
        this.state.options.map(function(item) {
          that.state.optionArray.push(item.option);
          that.state.optionIdArray.push(item.option_id);
        });
      } else {
        this.state.options.map(function(item) {
          that.state.optionArray.push(item.option);
          that.state.captionArray.push(item.caption);
          that.state.optionIdArray.push(item.option_id);
        });
      }
      this.setState({
        cnt: 1
      });
    }

    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Container>
              <Row>
                <Col md="10">
                  <Card>
                    <CardBody>
                      <form onSubmit={this.handleSubmit.bind(this)}>
                        <p className="h4 text-center py-4"> Edit Question </p>

                        <input
                          style={{ marginTop: "150px" }}
                          type="text"
                          class="form-control"
                          value={this.state.questionName}
                          name="question"
                          onChange={this.onChangeText.bind(this)}
                        />
                        <br />

                        {this.state.options.map((obj, i) =>
                          this.state.question_type === "text" ? (
                            <input
                              type="text"
                              class="form-control"
                              value={this.state.optionArray[i]}
                              name="question"
                              onChange={this.onChangeOption.bind(that, i)}
                            />
                          ) : (
                            <div>
                              <img
                                class="answer-body"
                                style={{
                                  height: "150px",
                                  width: "200px",
                                  padding: "20px"
                                }}
                                src={this.state.optionArray[i]}
                              />

                              <input
                                type="text"
                                class="form-control"
                                value={this.state.captionArray[i]}
                                name="question"
                                onChange={that.onChangeCaption.bind(that, i)}
                              />
                              <br />
                              <label class="filelabel">
                                Click here to Upload Image for Option {i + 1}
                                <input
                                  type="file"
                                  id="File"
                                  size="60"
                                  onChange={this.fileChangedHandler.bind(
                                    this,
                                    i
                                  )}
                                />
                              </label>
                              {this.state.imageOptionsLink[i] != null ? (
                                <p style={{ color: "green" }}>
                                  Image Uploaded Successfully
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          )
                        )}
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
                        <button
                          onClick={this.btnBackClick.bind(this)}
                          class="btn btn-info"
                          style={{
                            width: "130px",
                            height: "40px",
                            padding: "0.65em",
                            textTransform: "capitalize"
                          }}
                        >
                          Back
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
export default EditQuestion;
