import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { Component } from 'react'
import { db } from '../../firebase';
import firebaseApp from '../../firebase';

export default class ContactUs extends Component {
    constructor(){
        super();
        this.state={
            phoneNumber:null,
            email:"",
            edit:"",
            admin:""
        }
    }
 _handleKeyDown = (e)=> {
        if (e.key === 'Enter') {
          console.log('do validate');
          this.setState({...this.state, edit: !this.state.edit});
          db.collection("ContactUs").doc("1j8eoeVFtWZZN98InGZW").set({
           email: this.state.email,
           phoneNumber: this.state.phoneNumber
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
        return (
            <div>
                <h1>
                    Contact Us
                </h1>
                
                {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="phoneNumber" type="text" onChange={this.handleChange} value={this.state.phoneNumber}/>
                  : <div></div>
                  }
                  
                <h2>
                    Phone number: {this.state.phoneNumber}
                </h2>
                
                {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
                {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="email" type="text" onChange={this.handleChange} value={this.state.email}/>
                  : <div></div>
                  }
                <h2>
                    Email: {this.state.email}
                </h2>
                {this.state.admin?<IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>:<div></div>}
            </div>
        )
    }
}
