import React from 'react';
import { Container, Row, Col, Input, Button,Fa,CardBody,Card,CardHeader,Grid,View } from 'mdbreact';
import './Custom.css';
//import data from './responsedata';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class ResponseDare extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      showComponent:false,
      showResultComponent:false,
      name:'',
      AnswerArray: new Array(10),
      questionNumber:0,
      cnt:1,
      addClass: false,
      tmp:'',
      tmp1:'',
      score:0
        

}

this.btnFunc=this.btnFunc.bind(this);
this.btnClick=this.btnClick.bind(this);

  
}


btnFunc()
{
   
    
}


onAnswerClick(option_id,question_id,e){
    var chk=document.getElementsByClassName("green");
    var chk1=document.getElementsByClassName("red");
    if(chk.item(0) != null && chk1.item(0) != null ) {
        return
        }
    this.setState({
        tmp:option_id,
        tmp1:question_id
        
    })
    var data = {questionId: question_id , AnswerId:option_id };
    this.state.AnswerArray.push(data);
    if(option_id==question_id){
        this.setState({
            score:this.state.score + 1,
        });
        document.getElementById(option_id).classList.add("green");
             
    }
    else{
        document.getElementById(question_id).classList.add("green");
        document.getElementById(option_id).classList.add("red");
    }
}

btnClick(){
 var chk=document.getElementsByClassName("green");
 var chk1=document.getElementsByClassName("red");
  if(chk.item(0) === null && chk1.item(0) === null ) {
  alert("Please select option");
  return
  }
    if(this.state.tmp===this.state.tmp1){
        document.getElementById(this.state.tmp).classList.remove("green");

    }
    else{
        document.getElementById(this.state.tmp).classList.remove("red");
        document.getElementById(this.state.tmp1).classList.remove("green");
    }

    if(this.state.questionNumber===this.props.questionData.data.length -1)
  {
    this.setState({
      showResultComponent:true,
     
  });
  }
    this.setState({questionNumber : this.state.questionNumber + 1,
        cnt:this.state.cnt +1 
    });
}



  render() {
   var answers;
    var i = -1;
    var that = this;
    var question  =this.props.questionData.data.map(function(item){
        i = i + 1;
        if(i === that.state.questionNumber){
            answers= item.options.map(function(val){
                if(i === that.state.questionNumber){
                    return <a onClick={that.onAnswerClick.bind(that,val.option_id,item.answer_id)}><div id={val.option_id} class="answer-body">{val.option_value}<br /></div></a>
                }
            });
        return <div>{item.question}</div>
        
        }
    })
    

    return(
       <div class="contact-body">
            <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-8">
            {(!this.state.showResultComponent) && 
      <Container>
        <Row>
          <Col md="8" >
              <div class="card">
                <div class="card-body">
                  <div class="avatar mx-auto white">
                    <h6 class="text-center" style={{fontSize: '15px', margin: '0 auto', width: '120px', height: '40px', paddingTop: '10px',
                      paddingRight: '20px'}}><strong>
                      Question {this.state.questionNumber + 1} / {this.props.questionData.data.length} </strong> </h6>
                  </div>
                  <br />
                  <h5 class="card-title text-center" style={{fontSize: '35px'}}><strong>{question}</strong></h5>
                  <div className="text-center">
                  <br />
                  {answers}
                  <button onClick={this.btnClick}type="button" class="btn btn-secondary btn-rounded">Next</button>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
      </Container>
            }
             {(this.state.showResultComponent) && 

<Container>
<Row>
  <Col md="8" >
      <div class="card">
        <div class="card-body">
          <div class="avatar mx-auto white">
            <h5 class="text-center" ><strong>
             Congrats </strong> </h5>
           
          </div>
          <br />
          
          <div className="text-center">
          <h6><strong> Your Score {this.state.score} /{this.props.questionData.data.length}</strong></h6>
          <br />
           <Progress
                type="circle"
                percent={this.state.score * 10}
                />
                <br /> <br />
  
          <button onClick={this.btnFunc}type="button" class="btn btn-secondary btn-rounded">Create Your Dare</button>
          </div>
        </div>
      </div>
  </Col>
</Row>
</Container>

             }

      </div>
      </div>
      </div>
    );
  }
};

export default ResponseDare;