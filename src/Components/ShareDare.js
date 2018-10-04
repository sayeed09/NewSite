import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View } from 'mdbreact';
import './Custom.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { hashHistory } from 'react-router';
import Navbar from './NavBar';
import Result from './Result';

import SocialShare from './SocialShare';



class ShareDare extends React.Component  {
  constructor(props){
    super(props);
    this.state={
        link:'',
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


    
    this.state.link=localStorage.getItem('link');
    this.btnClickDelete=this.btnClickDelete.bind(this);
  }
  btnClickDelete(){
      alert('dare deleted');

        /* var that=this;
        var user_id = localStorage.getItem('user_id');
        fetch(`https://pure-badlands-16289.herokuapp.com/api/delete_dare/${user_id}`)
        .then(function (response) {
        return response.json()
        })
        .then(function (data) {
            console.log(data.data);

        
})
*/
      localStorage.clear();
      this.props.history.push('/');
  }
  btnClickResult(e){
    this.props.history.push('/results');

  }

  render() {
    

    return(
        <div class="contact-body">
            <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-8">
           
             <Container>
             <Row>
               <Col md="8">
               <div class="card">
                   <div class="card-body">
                   <h5 class="card-title text-center" color="primary-color"><strong>Your Dare is ready!</strong></h5>
                    <p class="text-center" style={{fontSize: '15px'}}>Share with your friends, and see who get maximum scores. 
                    </p>
                    <br />
 
                    <div className="text-center">
                          <input  className="form-control" value={this.state.link}
                              onChange={({target: {value}}) => this.setState({value, copied: false})} />

 
        <CopyToClipboard text={this.state.link}
          onCopy={() => this.setState({copied: true})}>
          <button  class="btn btn-secondary btn-rounded">Copy Link</button>
        </CopyToClipboard>
 
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        <br /><br />
        <SocialShare  link={this.state.link}/>
      
          
      <button  onClick={this.btnClickResult.bind(this)} type="button" class="btn btn-secondary btn-rounded">See all result</button>
      <button  onClick={this.btnClickDelete} type="button" class="btn btn-warning btn-rounded">Delete this dare</button>

    


                
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

export default ShareDare;