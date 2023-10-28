import { React, useContext } from 'react'
//import { Switch, Route } from 'react-router-dom'
import { UserContext } from './context';
import { getCookie, isLoggedIn } from './util';

const NavBar = () => {
	const { authenticated } = useContext(UserContext);
	
	//const isLoggedIn = useContext(UserContext);
	//setAuthenticated(isLoggedIn());
	//const cookies = getCookies();
	//console.log(`navbar.js: isLoggedIn = ${isLoggedIn()}`);
	console.log(`navbar.js authenticated = ${authenticated}`);
	//console.log(`navbar: user = ${getCookie('name')}`);
	
	//const isLoggedIn = React.useContext(UserContext);

	//console.log(`navbar.js\t: authenticated =  ${authenticated}`);// ${JSON.stringify(authenticated, null, 4)}`);
	//console.log(`navbar.js\t: ${

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
		{(authenticated==false) && <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>}
          {(authenticated==false) && <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>}
          {authenticated && <li className="nav-item">
            <a className="nav-link" href="#/openaccount/">Open Account</a>
          </li>}
          {authenticated && <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>}
          {authenticated && <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>}
          {(getCookie('accessLevel')=='teller') && <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>}
          {authenticated && <li className="nav-item">
            <a className="nav-link" href="#/logout/">Logout</a>
          </li>}    
        </ul>
      </div>
    </nav>
    </>
  );
}

export default NavBar