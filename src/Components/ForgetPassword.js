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
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  btnPrevious(e){
    this.props.history.push("/login");
  }
  render() {
    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8">
            <Container>
              <Row>
                <Col md="8">
                  <Card>
                    <CardBody>
                      <form>
                        <p className="h4 text-center py-4">Forget Password </p>
                        <div className="grey-text">
                          <Input
                            label="Your email"
                            icon="envelope"
                            group
                            name="email"
                            type="email"
                            required
                            validate
                            error="wrong"
                            success="right"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                          />
                          <Button color="cyan" type="submit">
                            Reset
                          </Button><br />
                          <Button onClick={this.btnPrevious.bind(this)} color="cyan" type="submit">
                            Back
                          </Button>
                        </div>
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
export default ForgetPassword;
