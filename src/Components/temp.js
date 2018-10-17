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
  View
} from "mdbreact";
import "./Custom.css";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import loader from "./loader.gif";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentWillMount() {
  
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
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="8">
                  <div class="card">
                    <div class="card-body">
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
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Dare Link</th>
                                <th scope="col">Last Visited</th>
                                <th scope="col">Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.adminData.map((item, index) => (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.mobile_number}</td>
                                  <td>{item.dare_link}</td>
                                  <td>{item.last_visited_at}</td>
                                  <td>{item.created_at}</td>
                                  
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
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

export default AdminPanel;
