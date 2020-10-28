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
import { storage } from './firebase';
import PressReleases from './Pages/PressReleases/PressReleases';
import ContactUs from './Pages/ContactUs/ContactUs';


export class App extends Component {
  state = {
    landingPageData: {},
  }
  getlandingPageData() { 
    this.setState({landingPageData : data, 
                       imageUrls: null,
                       videoUrls: null,
                       pdfUrls: null          
    });
  }
  getImages(){
    const that=this;
    const IU=[];

     storage.ref("images").listAll().then(function(result){
        result.items.forEach(function(imageRef){
            // console.log("Image reference"+ imageRef);
            imageRef.getDownloadURL().then(function(url){
                console.log(url)
                IU.push(url);
                // that.setState({imageUrls: IU}
               
           that.setState({...that.state,imageUrls: IU}, ()=> console.log(that.state.imageUrls));
                
                console.log(that.state)
  
            })
            
            
        })
       
    });

  }

  getVideos(){
    const that=this;
    const IU=[];

     storage.ref("videos").listAll().then(function(result){
        result.items.forEach(function(imageRef){
            // console.log("video reference"+ imageRef);
            imageRef.getDownloadURL().then(function(url){
                console.log(url)
                IU.push(url);
                // that.setState({imageUrls: IU}    
           that.setState({...that.state,videoUrls: IU}, ()=> console.log(that.state.videoUrls));
                
                console.log(that.state)
  
            })
            
            
        })
       
    });

  }
  getPdfs(){
    const that=this;
    const IU=[];

     storage.ref("pdfs").listAll().then(function(result){
        result.items.forEach(function(imageRef){
            // console.log("Image reference"+ imageRef);
            imageRef.getDownloadURL().then(function(url){
                console.log(url)
                IU.push(url);
                // that.setState({imageUrls: IU}
               
           that.setState({...that.state,pdfUrls: IU}, ()=> console.log(that.state.pdfUrls));
                
                console.log(that.state)
  
            })
            
            
        })
       
    });

  }

  componentDidMount() {
    this.getlandingPageData();
    this.getImages();
    this.getVideos();
    this.getPdfs();
  }


  render() {
    return (
    <div className="App">
     <BrowserRouter>
     <Header/>
     <Switch>
      <Route exact path='/' render={()=>(<Home />)}  />
      <Route exact path='/images' render={()=>(<Images data={this.state.imageUrls} />)}  />
      <Route exact path='/videos' render={()=>(< Videos data={this.state.videoUrls} />)}  />
      <Route exact path='/newsletter' render={()=>(<Newsletter data={this.state.pdfUrls} />)}  />
      <Route exact path='/pressreleases' render={()=>(<PressReleases data={this.state.pdfUrls} />)}  />
      <Route exact path='/contactus' render={()=>(<ContactUs data={this.state.pdfUrls} />)}  />
       
    
     </Switch>
   </BrowserRouter>
     
       
    </div>
  );
    }
}

export default App;
