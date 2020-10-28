import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { Component } from "react";

export class Home extends Component {
  constructor(){
    super();
    this.state={
      heading: "",
      subHeading: "",
      description: "",
      edit: false
    }
  }

  _handleKeyDown = (e) => {
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
                   <IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>
                  
                    <span></span>
                  </h1>
                  {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="subHeading" type="text" onChange={this.handleChange} value={this.state.subHeading}/>
                  : <div></div>
                  }
                  <h2>
                    {this.state.subHeading}
                    <IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>
                  </h2>
                  {this.state.edit? <input style={{background: "transparent", }} onKeyDown={this._handleKeyDown} name="description" type="text" onChange={this.handleChange} value={this.state.description}/>
                  : <div></div>
                  }
                 <p>{this.state.description}</p>
                 <IconButton style={{backgroundColor:"grey"}} onClick={()=>{ this.setState({...this.state, edit: !this.state.edit});}}>
                   <Edit/>
                   </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Home;
