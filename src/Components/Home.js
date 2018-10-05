import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid } from 'mdbreact';
import './Custom.css';
import home from './home.jpg';
import Question from './Question';
class Home extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      showComponen:false,
      name:'',
      createComponent:true,
      answerResponse: null,
      userData: null,
      errors:'',
      data:[],
      res:'',
      obj:{}
     
    }
    this.handleChange = this.handleChange.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onPreviousButtonClick = this._onPreviousButtonClick.bind(this);
 this._onCreateButtonClick=this._onCreateButtonClick.bind(this);
var that=this;
 fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/list`)
 .then(function (response) {
  return response.json()
})
.then(function (data) {
 that.setState({
  questionData:data
 })
   console.log('the data', data)
}).catch(function(error){
  alert('Server Error Please try again');
  return
});





  }
  _onButtonClick() {
     var that=this;
    

    this.setState({
      showComponent: true,
    });
  }
  handleChange (event) {
    this.setState({
        name: event.target.value
    })
}
_onPreviousButtonClick(){
  this.setState({
    showComponent: false,
    errors:''

  });
}

_answerResponse(data){
  this.setState({answerResponse: data});
  console.log(this.state.answerResponse);
}

_onCreateButtonClick(){

 if(this.state.name==""){
  this.setState({
    errors:'Please enter name to continue'
  })
 }
 else{
   
   var that=this;
   this.state.obj["name"]=this.state.name;
  var postName = {name: this.state.name};
  var postData=this.state.obj;
  fetch(`https://pure-badlands-16289.herokuapp.com/api/users`, {
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
        user_id:data.data.user_id
      })
    }).catch(function(error){
      alert('Server Error Please try again');
      return
    });


  this.setState({
    createComponent:false
 
   })
  }}

  componentDidMount(){
    if(localStorage.getItem('flag'))
    {
      this.props.history.push('/sharedare');
      return;
    }
  }
    render() {
    if((!this.state.createComponent)){
      return(
        <Question history={this.props.history} questionData = {this.state.questionData} userData ={this.state.user_id}  userName={this.state.name} />
      )
    }
    else{

    return(
      <div>
        <div class="contact-body">
            <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-8">


            {(!this.state.showComponent) && 
      <Container>
        <Row>
          <Col md="10">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title text-center" style={{fontSize: '35px'}}><strong>How Much Your Friends Know You?</strong></h6>
                <form>
                <div className="grey-text">
                <p className="h5 text-center py-4">Challenge your friends? </p>
                  </div>
                  <div className="text-center">
                  <img className="home-img" src={home} width="280" height="180" className="img-responsive img-thumbnail" /><br/><br/>
                    <Button onClick={this._onButtonClick}>Start Now<Fa icon="paper-plane-o" className="ml-1"/></Button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
            }
            {(this.state.showComponent) && 
            <Container>
            <Row>
              <Col md="10">
                <div class="card">
                  <div class="card-body"> 
                    <h5 class="card-title text-center"  style={{fontSize: '30px'}}><strong>How Well Do Your Friends Know You??</strong></h5><br />
                    <input type="text" placeholder="Enter your Name" class="form-control"  value={this.state.name} onChange={this.handleChange} />       
                    <span style={{color: "red",fontSize:'14px',marginLeft:'3px'}}>{this.state.errors}</span><br />

                    <div class="text-center">
                    <Button onClick={this._onCreateButtonClick}>Create Dare  <i class="fa fa-arrow-circle-o-right pr-2 pr-1" aria-hidden="true"></i> </Button>    
                    </div>
                  <br /><br /><br />
                    <div>
                        <h4>Instructions: </h4>
                        <ul>
                          <li>Enter Your Name
                          </li>
                          <li >Answer any 10 Questions about yourself.
                        </li>
                          <li>Share your quiz-link with your friends.
                        </li>
                        <li>Your friends will try to guess the right answers.

                        </li>
                        <li>Check the score of your friends at your quiz-link!

                        </li>
                        </ul>
                        </div>
                        <div class="text-center">
                        <Button  onClick={this._onPreviousButtonClick}  ><i class="fa fa-arrow-circle-left pr-2 pr-1" aria-hidden="true"></i> Previous  </Button>
                            </div>
                  </div>   
                </div> 
                
              </Col>
            </Row>
          </Container>

            }
       
      </div>
      <div class="col-md-2"></div>
      </div>
      </div>
      </div>
    );
  }
}
};

export default Home;