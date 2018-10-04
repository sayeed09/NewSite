import React from "react"
class CustomQuestion extends React.Component {
  state = {
    cats: [{name:"", age:""}],
    opts:[{name:''}],
    flg:0
  }

componentWillMount(){
    this.addCat();
}
handleChange = (e) => {
    if (["name", "age"].includes(e.target.className) ) {
      let cats = [...this.state.cats]
      cats[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ cats }, () => console.log(this.state.cats))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

addOption = (e) => {
    for (let i=0;i<2;i++){
        this.setState({
            opts: this.state.opts.concat([{ name: '' }])
          });}
}


addCat = (e) => {
    if(this.state.flag===4){
        alert('Maximum Question Limit Exceeded');
        return;
    }
     var  n =0;
    if(this.state.flg===0){
         n=4;
        this.setState({
            flg: this.state.flg +1
        })
    }
    else{
        this.setState({
            flg: this.state.flg +1
        })
         n=5;
    }
    for (let i=0;i<n;i++){
    this.setState((prevState) => ({
      cats: [...prevState.cats, {name:"", age:""}],
    }));}
  }
handleSubmit = (e) => { e.preventDefault() }
render() {
    let {owner, description, cats} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        <button onClick={this.addCat}>Add new Question</button>
        {
          cats.map((val, idx)=> {
            let catId = `cat-${idx}`, ageId = `age-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={catId}>{`Question ${idx + 1}  `}  </label>
                <input
                  type="text"
                  name={catId}
                  data-id={idx}
                  id={catId}
                  value={cats[idx].name} 
                  className="name"
                />
                  <button onClick={this.addOption}>Add Options</button>
                <label htmlFor={ageId}>Options</label>
                <input
                  type="text"
                  name={ageId}
                  data-id={idx}
                  id={ageId}
                  value={cats[idx].age} 
                  className="age"
                />
                
              </div>
            )
          })
        }
        <input type="submit" value="Submit" /> 
      </form>
    )
  }
}
export default CustomQuestion;