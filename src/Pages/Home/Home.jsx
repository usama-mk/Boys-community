import { Button, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { Component, useState } from "react";
import { db } from "../../firebase";
import firebaseApp from '../../firebase';




export class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      heading: "",
      subHeading: "",
      description: "",
      newsLeft:"",
      newsRight:"",
      edit: "",
      admin: ""
    }
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      this.setState({...this.state, edit: !this.state.edit});
      db.collection("HomeDetails").doc("7QV9C6wMaquUvCcjitnc").set({
        heading: this.state.heading,
         subHeading: this.state.subHeading,
         description: this.state.description,
         newsLeft: this.state.newsLeft,
         newsRight: this.state.newsRight
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
     

    }
  }
  handleChange= (e)=>{
    const {value, name} = e.target;
    console.log(name);
    this.setState({...this.state, [name]:value})
  }

  componentDidMount(){
    const that= this;
   
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
       that.setState({
         ...that.state, admin:user
       })
      } else {
        that.setState({
          ...that.state, admin:""
        })
      }
      });
  }
  

  render() {
    console.log(this.state.edit)
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                
                  {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="heading" type="text" onChange={this.handleChange} value={this.state.heading}/>
                  : <div></div>
                  }
                  <h1 >
                   {this.state.heading}
                   {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                  
                    <span></span>
                  </h1>
                  {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="subHeading" type="text" onChange={this.handleChange} value={this.state.subHeading}/>
                  : <div></div>
                  }
                  <h2 style={{color:"white"}}>
                    {this.state.subHeading}
                    {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                  </h2>
                  {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="description" type="text" onChange={this.handleChange} value={this.state.description}/>
                  : <div></div>
                  }
                 <p >{this.state.description}</p>
                 {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd section of homepage */}
       <div style={{margin:"auto",width:"100%" , display:"flex"}} className="news">


        <div style={{width:"50%", maxWidth:"50%", wordWrap: "break-word",  }} >
        {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                   {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="newsLeft" type="text" onChange={this.handleChange} value={this.state.newsLeft}/>
                  : <div></div>
                  }
                   <p style={{color:"black"}}>{this.state.newsLeft}</p>
        </div>
        <hr/>
        <div style={{width:"50%", maxWidth:"50%", wordWrap: "break-word", }} >
        {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                   {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="newsRight" type="text" onChange={this.handleChange} value={this.state.newsRight}/>
                  : <div></div>
                  }
                   <p style={{color:"black"}}>{this.state.newsRight}</p>
        </div>
       </div>
       {/*  */}
      </header>
    );
  }
}

export default Home;
