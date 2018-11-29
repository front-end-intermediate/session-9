import React, { Component } from 'react';
import axios from 'axios';
import Pirate from './components/Pirate'
import Header from './components/Header'
import PirateForm from './components/PirateForm'
// import piratesFile from './data/sample-pirates-object';

class App extends Component {

  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.removePirate = this.removePirate.bind(this);
    this.state = {
      pirates: {},
      isLoading: true,
      error: null
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    axios.get('http://localhost:3005/api/pirates')
    .then(response => this.setState({
      pirates: response.data,
      isLoading: false
    }))
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }
  
  render() {
    const { isLoading, error } = this.state;
  
    if (error) {
      return <p>{error.message}</p>;
    }
  
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div className="App">
        <Header headline="Pirates!" />
        
          {
            Object.keys(this.state.pirates)
            .map(key =>
              <Pirate key={key}
                index={key}
                details={this.state.pirates[key]}
                removePirate={this.removePirate} />)
          }

        <PirateForm addPirate={this.addPirate} />
      </div>
    );
  }

  // loadSamples() {
  //   this.setState({
  //     pirates: piratesFile
  //   })
  // }

  removePirate(key){
    const pirates = {...this.state.pirates}
    console.log(key)
    console.log(this.state.pirates[key]._id)
    let pirateDel = this.state.pirates[key]._id;
    axios.get(`http://localhost:3005/api/pirates/${pirateDel}`)
    .then(delete pirates[key])
    .then(this.setState({pirates}))
  }

  addPirate(pirate) {
    console.log(pirate)
    const pirates = { ...this.state.pirates }
    axios.post('http://localhost:3005/api/pirates/', pirate)
    .then ( pirates[pirate] = pirate )
    .then(this.setState({ pirates: pirates }))
  }

  // addPirate(pirate) {
  //   //take a copy of the current state and put it into pirates var
  //   const pirates = {...this.state.pirates}
  //   //create a unique id
  //   const timestamp = Date.now()
  //   //add new pirate using accessor and id - objectName["propertyName"] and assignment
  //   pirates[`pirate-${timestamp}`] = pirate
  //   //set state pirates with var pirates
  //   this.setState({ pirates: pirates })
  // }

}

export default App;
