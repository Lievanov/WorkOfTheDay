import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'

class Header extends Component {

  toCreateWorkout = () => {
    this.props.history.push("/workout");
  }

  toLogs = () => {
    this.props.history.push("/workout-history");
  }

  toHome = () => {
    this.props.history.push("/");
  }

  render(){
    return (
      <div>
      <Navbar brand='Work Of the Day' className="lime" right>
        <NavItem onClick={this.toLogs}>Workout History</NavItem>
        {(window.location.href.includes("workout") && <NavItem onClick={this.toHome}>Back</NavItem>) || <NavItem onClick={this.toCreateWorkout}>Create</NavItem>}
      </Navbar>
      </div>
    );
  }
}
export default withRouter(Header);



// <Navbar className="deep-orange darken-2" brand='Work Of the Day' right>
// {(window.location.href.includes("workout") &&
// <Link to="/"><Button waves='light'>Back</Button></Link>) ||
// <Link to="/workout"><Button waves='light'>Create</Button></Link> }
