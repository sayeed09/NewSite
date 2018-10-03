import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid } from 'mdbreact';
import './Custom.css';
import loader from './loader.gif'
import {Link} from 'react-router-dom';

class Register extends React.Component  {
      constructor(props){
        super(props);
        this.state={
          email:'',
          password:'',
          confirmPassword:'',
          mobile:'',
          obj:{},
          data:'',
          isLoading:false,
          loader:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.state.registerFunction=this.registerFunction.bind(this);
      }
    
      handleChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
  registerFunction(e){
 e.preventDefault();
 alert(this.state.email);
   this.setState({
      isLoading:true
  })    
 


  this.state.obj["email"]=this.state.email;
  this.state.obj["password"]=this.state.password;
  
  var postData = this.state.obj;
  var that=this;
 
/*
  fetch(`https://pure-badlands-16289.herokuapp.com/api/users/sign_up`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      that.setState({
        data:data
      })
    
    })*/
  }


  render() {
    if(this.state.loader){
      return(

    <div class="text-center">
    <img className="home-img" style={{height:'80px', width:'100px',justifyContent: 'center',
    alignItems:'center'}} src={loader}  className="img-responsive " />
  </div>
  );}

  return(
  
        <div className="contact-body">
            <div className="col align-self-center">
            <div className="col-12 col-sm-3 col-lg-8">
      <Container>
        <Row>
          <Col md="6">
          <Card style={{width: '500px'}}>
              <CardBody>
              <form onSubmit={this.registerFunction.bind(this)} >
              <p className="h4 text-center py-4">Register </p>
              <div className="grey-text">
                <Input label="email" icon="envelope" group type="email" validate error="wrong" success="right" name="email" value={this.state.email} onChange={this.handleChange}/>
                <Input label="password" icon="lock" group type="password" validate value={this.state.password} name="password" onChange={this.handleChange}/>
                <Input label="confirm password" icon="lock" group type="password" validate value={this.state.confirmPassword} name="confirmPassword" onChange={this.handleChange}/>
                <Input label="mobile" icon="mobile" group type="number" className="quantity" validate value={this.state.mobile} name="mobile" onChange={this.handleChange}/>
              </div>
              <div className="text-center py-4 mt-3">
                <Button color="cyan" type="submit">Register</Button>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">Already have an account? <Link to="/login"> Sign in</Link></p>
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

export default Register;