import React, { Component } from 'react';
import './App.css';
const ipfsClient = require('ipfs-http-client')
const ipfs =ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      ipfsHash: 'QmdYMzY6oEejiaa5WKeo26AxsGvPNerP64xff4nLv4y842'
    };
  }
  captureFile = (event) => {
    event.preventDefault()
    //Process file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({'buffer': Buffer(reader.result)})
    }
    
  }
  // Example hash: "QmdYMzY6oEejiaa5WKeo26AxsGvPNerP64xff4nLv4y842"
  // Example url: https://ipfs.infura.io/ipfs/QmdYMzY6oEejiaa5WKeo26AxsGvPNerP64xff4nLv4y842

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting the form..")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('ipfs result', result)
      const ipfsHash = result[0].hash
      this.setState({ipfsHash: ipfsHash})
      if(error){
        console.error(error)
        return
      }
    })

  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPFS Ethereum 
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`} />
                </a>
                <h3>Upload New Image</h3>
                <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile}/>
            <input type='submit' />
                </form>
               </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
