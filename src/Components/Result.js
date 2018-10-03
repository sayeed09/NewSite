import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View } from 'mdbreact';
import './Custom.css';
//import data from './responsedata';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class Result extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      showComponent:false,
      questionNumber:0,
     data:
      [{
        id: 1,
        name: "Simon Bailey"
      }, {
        id: 2,
        name: "Thomas Burleson"
      }, {
        id: 3,
        name: "Will Button"
      }, {
        id: 4,
        name: "Ben Clinkinbeard"
      }, {
        id: 5,
        name: "Kent Dodds"
      }, {
        id: 6,
        name: "Trevor Ewen"
      }, {
        id: 7,
        name: "Aaron Frost"
      }]
     
        

}

  
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
              <div class="card">
                <div class="card-body">
                  <div class="avatar mx-auto white">
                    <h6 class="text-center" style={{fontSize: '15px', margin: '0 auto', width: '120px', height: '40px', paddingTop: '10px',
                      paddingRight: '20px'}}><strong>
                      Results</strong> </h6>
                  </div>
                  <br />
                  
                  <div className="text-center">


                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                      </tr>
                    </thead>
                    <tbody>
             
                  {
                    this.state.data.map((item, index) => (
                        
                          <tr>
                            <td>
                          {item.name}</td>
                          <td>{item.id}</td>
                          </tr>
                          
                      
                    ))}
                    
                  
                  </tbody>
                  </table>


        
                  <button type="button" class="btn btn-secondary btn-rounded">Next</button>
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
};

export default Result;