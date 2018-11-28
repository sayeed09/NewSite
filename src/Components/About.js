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
  CardText
} from "mdbreact";
import "./Custom.css";
class About extends React.Component {
  btnClick() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div class="contact-body">
        <div class="text-center row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="10">
                  <Card>
                    <CardBody>
                      <h4>About us </h4>
                      <hr />
                      <br />
                      <h4>Do you think your friends know you?</h4>
                      <CardText>
                        Test your friendship by Creating a Challenge (Challange) for
                        them and test the strength of your friendship.
                      </CardText>
                      <Button class="btnClass" style={{ borderRadius: "25px", width: "175px", height: "50px", outline: "0" }} onClick={this.btnClick.bind(this)}>
                        Create Challenge{" "}
                        <i
                          class="fa fa-arrow-circle-o-right pr-2 pr-1"
                          aria-hidden="true"
                        />{" "}
                      </Button>

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

export default About;
