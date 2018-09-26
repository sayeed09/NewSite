import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View } from 'mdbreact';
import './Custom.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import SocialShare from './SocialShare';



class ShareDare extends React.Component  {
  constructor(props){
    super(props);
    this.state={
        link:''
     
}


    
    this.state.link=localStorage.getItem('link');
    this.btnClickDelete=this.btnClickDelete.bind(this);
  }
  btnClickDelete(){
      alert('dare deleted');
      localStorage.clear();
      this.props.history.push('/');
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
                          <input value={this.state.link}
                              onChange={({target: {value}}) => this.setState({value, copied: false})} />

 
        <CopyToClipboard text={this.state.link}
          onCopy={() => this.setState({copied: true})}>
          <button>Copy Link</button>
        </CopyToClipboard>
 
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        <br /><br />
        <SocialShare  link={this.state.link}/>

          
      <button  onClick={this.btnClickResult} type="button" class="btn btn-secondary btn-rounded">See all result</button>
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