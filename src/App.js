import { React, useContext, useState, setState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Card, UserContext } from './context';
import logo from './logo.svg';
import './App.css';
import NavBar from './navbar';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Transfer from './transfer';
import AllData from './alldata';
import Balance from './balance';
import Logout from './logout';
import OpenAccount from './openaccount';
import { getCookie, isLoggedIn } from './util';

//      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>


function App() {
	//const [authenticated, setAuthenticated] = useState();//(getCookie('name')!==null)?true:false);//isLoggedIn());
	//const { authenticated, setAuthenticated } = useContext();//UserContext);
	//console.log(`App.js\t: ${authenticated}`);
	const [authenticated, setAuthenticated] = useState(isLoggedIn());

	/*useEffect(() => {
		setAuthenticated((getCookie('name')!==null)?true:false);
	}, []);*/


  return (
	<HashRouter basename="/">
      <UserContext.Provider value={{ authenticated, setAuthenticated }}>
		<div className="container" style={{padding: "20px"}}>
		<NavBar/>
		<Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/CreateAccount/" element={<CreateAccount />} />
          <Route exact path="/login/" element={<Login />} />
          <Route exact path="/openaccount/" element={<OpenAccount />} />
          <Route exact path="/deposit/" element={<Deposit />} />
          <Route exact path="/transfer/" element={<Transfer />} />
          <Route exact path="/withdraw/" element={<Withdraw />} />
          <Route exact path="/balance/" element={<Balance />} />
          <Route exact path="/alldata/" element={<AllData />} />
          <Route exact path="/logout/" element={<Logout />} />
		</Routes>
		</div>
      </UserContext.Provider>      
    </HashRouter>
  );
}

export default App;
