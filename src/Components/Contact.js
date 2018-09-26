import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid } from 'mdbreact';
import './Custom.css';
class Contact extends React.Component  {
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
              <CardHeader color="primary-color" tag="h3">Write to us</CardHeader>
            <form>
              <div className="grey-text">
                <Input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
                <Input type="textarea" rows="2" label="Your message" icon="pencil"/>
              </div>
              <div className="text-center">
                <Button outline color="secondary">Send <Fa icon="paper-plane-o" className="ml-1"/></Button>
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
};

export default Contact;