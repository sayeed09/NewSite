import React from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

import Dropzone from "react-dropzone";
import request from "superagent";
const CLOUDINARY_UPLOAD_PRESET = "swfktg2j";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dd0xblcox/image/upload";

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      selectedFile: null
    };
  }

  handleImageUpload(file, e) {
    var that = this;
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_UPLOAD_URL,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: formData
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      size: event.target.files[0].size
    });
    console.log(this.state.size);
  };

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
      

        <input type="file" onChange={this.fileChangedHandler.bind(this)} />
        <button
          onClick={this.handleImageUpload.bind(this, this.state.selectedFile)}
        >
          upload
        </button>
      </div>
    );
  }
}
export default Temp;
