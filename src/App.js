import React, { Component } from 'react';
import data from './data.json';
import './App.css';
import Home from './Pages/Home/Home';
import Header from './Pages/Home/navigation';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom'
import './style.css';
import Images from './Pages/Images/Images';
import Newsletter from './Pages/Newsletter/Newsletter';
import Videos from './Pages/Videos/Videos';


export class App extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() { 
    this.setState({landingPageData : data});
  }

  componentDidMount() {
    this.getlandingPageData();
  }


  render() {
    return (
    <div className="App">
     <BrowserRouter>
     <Header/>
     <Switch>
      <Route exact path='/' render={()=>(<Home data={this.state.landingPageData.Header} />)}  />
      <Route exact path='/images' render={()=>(<Images data={this.state.landingPageData.Images} />)}  />
      <Route exact path='/videos' render={()=>(< Videos data={this.state.landingPageData.Videos} />)}  />
      <Route exact path='/newsletter' render={()=>(<Newsletter data={this.state.landingPageData.Images} />)}  />
       
    
     </Switch>
   </BrowserRouter>
     
       
    </div>
  );
    }
}

export default App;
