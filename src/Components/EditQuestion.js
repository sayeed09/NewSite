import React from 'react'



class EditQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            option:[],
           question:''
        }
        this.setState({
            txtValue:this.props.data.question
        })
    
    }
    
    onChange(e){       
        const { name, value } = e.target;
      this.setState({ [name]: value });
    }
    render(){
        var that=this;
       var answers= this.props.data.options.map(function(val){
                    return <div><input type="text" class="form-control" name="option"  onChange={this.onChange.bind(this)} /> <br /></div>
        })
        return(
            <div>
                <input type="text" class="form-control" value={this.state.question} name="question" onChange={this.onChange.bind(this)} />
                {answers}
                </div>
        )
    }

}

export default EditQuestion;