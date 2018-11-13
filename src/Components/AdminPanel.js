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
  Table,
  TableBody,
  TableHead
} from "mdbreact";
import "./Custom.css";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import loader from "./loader.gif";
import { Tabs, Tab } from "react-bootstrap-tabs";
import SimpleCrypto from "simple-crypto-js";
import numeral from "numeral";
class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { obj: {}, data: "", loader: true };
  }
  componentWillMount() {
    var that = this;
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);

    this.state.obj["auth_token"] = decipherText;
    var postData = this.state.obj;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/admin_data`, {
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
        console.log(data.data);
        that.setState({
          loader: false,
          data: data.data
        });
        var admin_data = data.data;
        console.log("var", admin_data);
        that.setState({
          da: admin_data
        });
      });
  }
  handleSelect(e) {
    if (e === 1) {
      this.props.history.push("adminadd");
    }
    if (e === 0) {
      this.props.history.push("/adminquestion");
    }
    if (e === 2) {
      this.props.history.push("/admin");
    }
  }
  btnClickDelete(id, e) {
    var that = this;
    this.setState({
      loader: true
    });
    var that = this;
    var user_id = id;
    fetch(
      `https://pure-badlands-16289.herokuapp.com/api/users/delete_dare/${user_id}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        that.setState({
          loader: false
        });
        that.props.history.push("/admin");
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

    return (
      <div class="contact-body">
        <Tabs onSelect={this.handleSelect.bind(this)} selected="Panel">
          <Tab label="Questions" />
          <Tab label="Add Question" />
          <Tab label="Panel" />
        </Tabs>
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
            <strong>Admin Data</strong>{" "}
          </h6>
        </div>
        <br />

        <div className="text-center">
          <Table responsive>
            <TableHead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Dare Link</th>
                <th scope="col">Last Visited</th>
                <th scope="col">Created At</th>
                <th scope="col">Delete Dare</th>
                <th scope="col">Delete User</th>
              </tr>
            </TableHead>
            <TableBody>
              {console.log("datata", this.state.data)}
              {this.state.data.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile_number}</td>
                  <td>{item.dare_link}</td>
                  <td>{item.last_visited_at}</td>
                  <td>
                    {new Date(item.created_at).toDateString()}
                    {" / "}
                    {numeral(new Date(item.created_at).getHours()).format(
                      "00"
                    ) +
                      ":" +
                      numeral(new Date(item.created_at).getMinutes()).format(
                        "00"
                      )}
                  </td>
                  <td>
                    <Button onClick={that.btnClickDelete.bind(that, item.id)}>
                      <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
                  </td>
                  <td>
                    <Button>
                      <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
