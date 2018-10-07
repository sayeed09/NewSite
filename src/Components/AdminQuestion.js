import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View,TextField } from 'mdbreact';
import './Custom.css';
import loader from './loader.gif'
import EditQuestion from './EditQuestion';




class AdminQuestion extends React.Component  {
  constructor(props){
    super(props);
    this.state={
        questionData:'',
        loader:true,
        questionNumber:0,
    

   
}


var that=this;
fetch(`https://pure-badlands-16289.herokuapp.com/api/questions/list`)
.then(function (response) {
 return response.json()
})
.then(function (data) {
that.setState({
 questionData:data,
 loader:false,
 editComponent:false
})

})
  }

 editButtonClick(item,e){
     this.setState({
         editComponent:true,
         item:item
     })
//this.props.history.push("/editquestion/"+item.question_id)
//this.props.history.push({ pathname: "/editquestion", search: item.question_id });
}

  
btnClick(e){
    this.setState({
        questionNumber:this.state.questionNumber+1
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
  else{
    var answers;
    var i = -1;
    var that = this;
   
     var question  =this.state.questionData.data.map(function(item){
     
        return <div>{item.question}<Button onClick={that.editButtonClick.bind(that,item)}>Edit</Button></div>
        
        
    })
        
        

  }

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
                   
                  </div>
                  {!this.state.editComponent &&
                  <div>
                  <br />
                  <h5 class="card-title text-center" style={{fontSize: '35px'}}><strong></strong></h5>
                  <div className="text-center">
                  <br />
            
                {question}
             
                  <button onClick={this.btnClick.bind(this)}type="button" class="btn btn-secondary btn-rounded">Next</button>
                  </div>
                  </div>
                  }
                  {this.state.editComponent  &&
                   <EditQuestion data={this.state.item} />
                   
                
                }
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

export default AdminQuestion;