import { React, useContext, useState, useEffect } from 'react'
//import { Switch, Route } from 'react-router-dom'
import { Card, UserContext } from './context';
import { getCookie, loginGoogleUser, getAccounts } from './util';
import { useNavigate } from 'react-router-dom';
import { AccountInfo } from './accounts';
import axios from "axios";
import { API_URL } from './config';


const Home = (props) => {
	const { authenticated, setAuthenticated } = useContext(UserContext);
	const [ accounts, setAccounts ] = useState([]);
	const navigate = useNavigate();

	/*if(getCookie('email')) {
		setAuthenticated(true);
		//authenticated = true;
	}*/

	
	console.log(`home.js authenticated is now ${authenticated}`);

	console.log(`inside home, user = ${getCookie('name')}: email = ${getCookie('email')}`);
	if((getCookie('email')!=null) && (getCookie('login')==='google')) {
		console.log(`need to login google user ${getCookie('email')}`);
		
		loginGoogleUser();
		setAuthenticated(true);
		console.log(`home.js authenticated is now ${authenticated}`);
		navigate('/');
	}

	const userTitle = "Welcome to the bank"+(getCookie('name')?(", "+getCookie('name')):"");


console.log(`email = ${getCookie('email')}`);
		useEffect(() => {
	axios.get(API_URL+"/accounts/find/"+getCookie('email'))
			.then((res) => {
				console.log(`AccountInfo res.ok = ${res.data.ok}`);
				setAccounts(res.data.data);
				if(res.data.ok == true) {
					console.log(`data = ${JSON.stringify(res.data.data, null, 4)}`);
				}
			});
		}, []);

	console.log(`type of account = ${typeof accounts}`);
	
	console.log(`39 ${JSON.stringify(accounts, null, 4)}`);
	const email = getCookie('email'); 

	return (
		<Card
		headercolor="primary"
		bodycolor="white"
		header="BadBank Landing Module"
		title={userTitle}
		text="You can move around using the navigation bar."
		body={authenticated && (typeof accounts === "object" && accounts.map((e) => (<AccountInfo accountNumber={e.accountNumber}
			type={e.type}
			balance={e.balance} />)))}
	/>
	);
}

export default Home;

/*(accounts && accounts.map((e) => (<AccountInfo accountNumber={e.accountNumber}
							type={e.type}
							balance={e.balance} />)))*/