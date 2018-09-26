import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View } from 'mdbreact';
import './Custom.css';


class Result extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      showComponent:false,
   

}

  
}





    



 


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


              
              <CardHeader color="primary-color" tag="h5"></CardHeader>
            
            
              <div className="text-center">
             
              <br />
              <button onClick={this.btnClick}type="button" class="btn btn-secondary btn-rounded">Next</button>              </div>
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

export default Result;