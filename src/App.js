import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "crocin"
    };
  }

  handleChange = e => {
    var val = e.target.value;
    this.setState({ [e.target.name]: val });
  };

  handleAdd = e => {
    console.log(this.state);
    fetch('http://localhost:3000/medicine/write', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state),
  }).then(function(response){
    return response.statusText
  })

    // axios
    //   .post("http://localhost:3000/medicine/write", this.state,
    //   {
    //     'Access-Control-Allow-Origin': 'http://localhost/3001',
    //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <div className="container">
        <div className="col-sm-12">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    placeholder="Medicine name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Manufacturer</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="manufacturer"
                    value={this.state.manufacturer}
                    onChange={this.handleChange}
                    placeholder="Manufacturer name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Batch No.</label>
                </td>
                <td>
                  <input type="text" placeholder="Batch No." />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Expiration Date</label>
                </td>
                <td>
                  <input type="text" placeholder="Expiration date" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Price</label>
                </td>
                <td>
                  <input type="text" placeholder="Price" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Type</label>
                </td>
                <td>
                  <select name="type" id="medicineType">
                    <option value="select">--Select--</option>
                    <option value="capsule">Capsule</option>
                    <option value="tablet">Tablet</option>
                    <option value="syrup">Syrup</option>
                    <option value="gel">Gel</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    className="btn btn-primary"
                    type="button"
                    value="Add Medicine"
                    onClick={this.handleAdd}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <table>
            
          </table>
        </div>
      </div>
    );
  }
}

export default App;
