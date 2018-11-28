import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import SimpleCrypto from "simple-crypto-js";
const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }
},
]
const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Age',
  accessor: 'age',
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

export default class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {}
    }
  }
  componentWillMount() {
    this.getdata();
  }
  getdata() {
    var that = this;
    var _secretKey = "thekeyof12NewSite";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    var chiperText = localStorage.getItem("token");
    var decipherText = simpleCrypto.decrypt(chiperText);

    this.state.obj["auth_token"] = decipherText;
    var postData = this.state.obj;
    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/admin_data`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        that.setState({
          loader: false,
          data: data.data
        });
        var admin_data = data.data;
        that.setState({
          da: admin_data
        });
      });
  }

  render() {


    return (
      <div style={{ marginTop: "100px" }}>
        <ReactTable
          data={this.state.data}
          columns={columns}
        />
      </div>);
  }
}