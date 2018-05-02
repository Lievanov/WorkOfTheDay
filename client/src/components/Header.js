import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Button } from 'react-materialize'
function Header() {
  return (
    <div>
      <Navbar className="deep-orange darken-2" brand='Work Of the Day' right>
        {(window.location.href.includes("workout") &&
          <Link to="/"><Button waves='light'>Back</Button></Link>) ||
            <Link to="/workout"><Button waves='light'>Create</Button></Link> }
      </Navbar>
    </div>
  );
}
export default Header;
