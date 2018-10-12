import React from "react";
class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [""],
      question: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI() {
    return this.state.options.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          class="form-control"
          placeholder={`Option ${i + 1} `}
          value={el || ""}
          onChange={this.handleChange.bind(this, i)}
        /> <br />
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
        </button><br /> 

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
    alert("A name was submitted: " + this.state.options.join(", "));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Question"
          value={this.state.question}
          name="question"
          onChange={this.onChangeText.bind(this)}
        /><br />
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
    );
  }
}
export default Temp;
