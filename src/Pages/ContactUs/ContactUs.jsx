import { IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { Component } from 'react'

export default class ContactUs extends Component {
    constructor(){
        super();
        this.state={
            phoneNumber:null,
            email:"",
            edit: false,
        }
    }
 _handleKeyDown = (e)=> {
        if (e.key === 'Enter') {
          console.log('do validate');
          this.setState({...this.state, edit: !this.state.edit});
    
    
        }
    }
    handleChange= (e)=>{
        const {value, name} = e.target;
        console.log(name);
        this.setState({...this.state, [name]:value})
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
                
                <IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>
                {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="email" type="text" onChange={this.handleChange} value={this.state.email}/>
                  : <div></div>
                  }
                <h2>
                    Email: {this.state.email}
                </h2>
                <IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>
            </div>
        )
    }
}
