import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,CardText } from 'mdbreact';
import './Custom.css';
class About extends React.Component  {

  btnClick(){
    this.props.history.push("/");
  }

  render() {
    return(
      <div class="contact-body">
            <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-8">
      <Container>
        <Row>
          <Col md="8" >
          <Card >
              <CardBody>
              <CardHeader color="primary-color" tag="h5">About us</CardHeader>
              <br />
            <h4>Do you think your friends know you?</h4>
            <CardText>Test your friendship by Creating a Dare (Challange) for them and test the strength of your friendship.
             </CardText>
             <Button onClick={this.btnClick.bind(this)} color="cyan">Create Dare</Button>
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

export default About;