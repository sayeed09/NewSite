import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid } from 'mdbreact';
import './Custom.css';
class Login extends React.Component  {
  render() {
    return(
        <div className="contact-body">
            <div className="col align-self-center">
            <div className="col-12 col-sm-3 col-lg-8">
      <Container>
        <Row>
          <Col md="6">
          <Card style={{width: '500px'}}>
              <CardBody>
              <form>
              <p className="h4 text-center py-4">Log In </p>
              <div className="grey-text">
                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Your password" icon="lock" group type="password" validate/>
                <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="#" className="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
              </div>
              <div className="text-center py-4 mt-3">
                <Button color="cyan" type="submit">Login</Button>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">Don't have an account? <a href="#" className="dark-grey-text font-weight-bold ml-1"> Sign up</a></p>
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
};

export default Login;