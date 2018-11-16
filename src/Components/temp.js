import React from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";
import XLSX from 'xlsx';
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
import Dropzone from "react-dropzone";
import request from "superagent";
import readXlsxFile from 'read-excel-file'

const CLOUDINARY_UPLOAD_PRESET = "swfktg2j";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dd0xblcox/image/upload";

  const schema={
    'Name':{
    prop:'name',
    type:String
    }
  }

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

/*
var workbook = new Excel.Workbook(event.target.files[0]);
workbook.xlsx.readFile().then(function () {
            
//Get sheet by Name
var worksheet=workbook.getWorksheet('Sheet1');
            
//Get Lastrow
var row = worksheet.lastRow
console.log(row);
            
//Update a cell
row.getCell(1).value = 5;
 
row.commit();
 
//Save the workbook
return workbook.xlsx.writeFile("event.target.files[0]");
 *
});
*/
    readXlsxFile(event.target.files[0]).then((rows) => {
      console.log(rows);
    });

    /*
    this.setState({
      selectedFile: event.target.files[0],
      size: event.target.files[0].size
    });
    let data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data);*/
  };

  render() {
    return (
      <div class="contact-body">
        <br />
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="8">
                  <Card>
                    <CardBody>
                      <input
                        type="file"
                        onChange={this.fileChangedHandler.bind(this)}
                      />
                      <button
                        onClick={this.handleImageUpload.bind(
                          this,
                          this.state.selectedFile
                        )}
                      >
                        upload
                      </button>
                      
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
export default Temp;
