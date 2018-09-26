import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,CardText } from 'mdbreact';
import './Custom.css';
class About extends React.Component  {
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
              <CardHeader color="primary-color" tag="h5">About us</CardHeader>
              <br />
            <h4>Do you think your friends know you?</h4>
            <CardText>Test your friendship by Creating a Dare (Challange) for them and test the strength of your friendship.
             </CardText>
             <Button color="cyan">Create Dare</Button>
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