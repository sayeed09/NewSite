import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid } from 'mdbreact';
import './Custom.css';
import loader from './loader.gif'
import * as PubSub from 'pubsub-js';
import {Link} from 'react-router-dom';

class Login extends React.Component  {
      constructor(props){
        super(props);
        this.state={
          email:'',
          password:'',
          obj:{},
          data:'',
          loader:false,
          btndisable:true,
          errEmail:'',
          errPass:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.state.loginFunction=this.loginFunction.bind(this);
      }


    handleChange (e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
      
  }

  loginFunction(e){
    this.setState({
      loader:true
    })
    e.preventDefault();
   this.state.obj["email"]=this.state.email;
  this.state.obj["password"]=this.state.password;
  
  var postData = this.state.obj;
  var that=this;

  fetch(`https://pure-badlands-16289.herokuapp.com/api/users/sign_in`, {
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
        loader:false,
      
      })
      if(data.error==="Incorrect Username/Password"){
        alert("Incorrect Username/Password");
        return;
      }
      if(data.data.auth_token!=null){
        PubSub.publish('UPDATE_NAV_MENU', data.data.name);
        alert("sucessfully logged in");
      }
      
   
    
    })
  }


  render() {
 if(this.state.loader){
  return(
    <div class="text-center">
    <img className="home-img" style={{height:'80px', width:'100px',marginTop:"300px",
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

              <form  onSubmit={this.loginFunction.bind(this)}>
              <p className="h4 text-center py-4">Log In </p>
              <div className="grey-text">
                <Input label="Your email" icon="envelope" group name="email" type="email" required validate error="wrong" success="right" value={this.state.email} onChange= {this.handleChange} />
                <Input label="Your password" icon="lock" group type="password" name="password" validate required value={this.state.password} onChange = {this.handleChange} />
                <p className="font-small grey-text d-flex justify-content-end"><Link to="/forgotpassword"> Forgot Password? </Link> </p>
              </div>
              <div className="text-center py-4 mt-3">
                <Button color="cyan" type="submit">Login</Button>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">Don't have an account?  <Link to="/register">Sign up</Link></p>
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