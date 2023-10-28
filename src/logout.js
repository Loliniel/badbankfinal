import { React, useContext } from 'react'
import { API_URL } from './config';
import axios from "axios";
import { getCookie, eraseCookie } from './util';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context';




const Logout = (props) => {
	console.log('inside logout');
	const navigate = useNavigate();
	const { setAuthenticated } = useContext(UserContext);

	if (getCookie('name') != null) {
		(async () => {
			console.log('trying to log out with async');
			new Promise((res, rej) => {
				axios.get(API_URL + '/logout').then((res) => {
					console.log(`Logging user ${getCookie('name')} out.`);
				});
			});
		})();
	}

	if(getCookie('name')) {
		console.log(`Erasing 'name' cookie.`);
		eraseCookie('name');
	}

	if(getCookie('email')) {
		console.log(`Erasing 'email' cookie.`);
		eraseCookie('email');
	}

	if(getCookie('id')) {
		console.log(`Erasing 'id' cookie.`);
		eraseCookie('id');
	}

	if(getCookie('accessLevel')) {
		console.log(`Erasing 'accessLevel' cookie.`);
		eraseCookie('accessLevel');
	}

	if(getCookie('accountNumber')) {
		console.log(`Erasing 'accountNumber' cookie.`);
		eraseCookie('accountNumber');
	}

	setAuthenticated(false);
	setTimeout(() => {
		navigate('/');
	}, 1500);

	/*
		if(getCookie('name')!=null) {
			axios.get(API_URL+'/logout').then((res) => {
				console.log(`Logging user ${getCookie('name')} out.`);
				eraseCookie('name');
				eraseCookie('email');
				eraseCookie('id');
				eraseCookie('accessLevel');
			});
		}*/

	return (
		<><div>Logging out ... </div></>
	)
}

export default Logout;