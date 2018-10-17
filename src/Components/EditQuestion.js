import React from "react";
import loader from "./loader.gif";
import temp from "./temp";
import SimpleCrypto from "simple-crypto-js";

const optionArray = [];
const optionIdArray = [];
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
      options: [""],
      question: "",
      id: "",
      loader: true,
      cnt: 0,
      answerArray: [],
      qid: "",
      obj: {},
      resultObj: {}
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
          loader: false
        });
        console.log(data);
      });
  }

  onChangeText(e) {
    this.setState({ questionName: e.target.value });
  }

  handleSubmit(event) {
    this.setState({
      loader: true
    });

    for (var i = 0; i < optionArray.length; i++) {
      var optionModel = {
        option_id: optionIdArray[i],
        option: optionArray[i]
      };
      this.state.answerArray.push(optionModel);
    }
    if (localStorage.getItem("token") === null) {
      alert("Please Login again");
      this.props.history.push("/login")
      return;
    } else {
      this.state.obj["question_id"] = this.state.idd;
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
  onChangeOption(idx, e) {
    optionArray[idx] = e.target.value;
    this.setState({
      a: 45
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
    }
    if (this.state.cnt === 0) {
      var that = this;
      this.state.options.map(function(item) {
        optionArray.push(item.option);
        optionIdArray.push(item.option_id);
      });
      this.setState({
        cnt: 1
      });
      console.log(that.state.optionArray);
    }
    return (<div>
        <h3>Admin Panel</h3>
       <ul class="nav nav-pills">
    <li class="active"><a href="/admin">Home</a></li>
    <li><a href="#">Edit Questions</a></li>
    <li><a href="#">Add Questions</a></li>
   </ul>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          style={{ marginTop: "150px" }}
          type="text"
          class="form-control"
          value={this.state.questionName}
          name="question"
          onChange={this.onChangeText.bind(this)}
        />
        <br />

        {this.state.options.map((obj, i) => (
          <input
            type="text"
            class="form-control"
            value={optionArray[i]}
            name="question"
            onChange={this.onChangeOption.bind(that, i)}
          />
        ))}
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
      </div>
    );
  }
}
export default EditQuestion;
