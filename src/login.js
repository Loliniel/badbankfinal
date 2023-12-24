import { React, useState, useContext } from 'react'
//import { Switch, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Card, UserContext } from './context';
import { API_URL } from './config';
import axios from "axios";
import { getCookie, setCookie } from './util';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Login = (props) => {
	const [show, setShow] = useState(true);
	const [status, setStatus] = useState('');
	//const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showError, setShowError]					= useState(false);
	const [errorTitle, setErrorTitle]				= useState("");
	const [errorText, setErrorText]					= useState("");
	const { authenticated, setAuthenticated } = useContext(UserContext);
	//const user = React.useContext(UserContext);

	const navigate = useNavigate();

	if(authenticated === true) {
		//setShow(false);
	}


	function handleLogin() {
		setEmail(document.getElementById('email').value);
		setPassword(document.getElementById('password').value);
		if(email === '') {
			setStatus('Error: no email entered.');
		}

		if(password === '') {
			setStatus('Error: no password entered.');
		}

		console.log(`email = ${email}\npassword = ${password}`);
		console.log(`API_URL = ${API_URL}`);
		axios.post(API_URL + '/user/login', {
			email: email,
			password: password
		}).then((res) => {
			if (res.data.ok === true) {
				setCookie('name', res.data.data.name, 7);
				setCookie('email', res.data.data.email, 7);
				setCookie('id', res.data.data._id, 7);
				setCookie('accessLevel', res.data.data.accessLevel, 7);
				setAuthenticated(true);

				console.log(`user found: _id(${res.data.data._id})`);
				console.log(`username = ${res.data.data.name}`);


				setTimeout(() => {
					console.log(`redirecting to main page ... `);
					navigate('/');
				}, 1500);
			} else {
				setErrorTitle(`Error!`);
				setErrorText(`Error: ${res.data.data}`);
				setShowError(true);
				setStatus(`Error`);
				//setTimeout(() => setStatus(''),3000);
				console.log(`Ok false: ${res.data.data}`);
			}
		});
	//	const cookies = getCookies();

		console.log(`user now is ${getCookie('name')}`);
	}

	function clearForm() {
		document.getElementById('email').value = '';
		document.getElementById('password').value = '';
	}

	/*function validate() {
	}*/

	return (
		<>
		<Card
			headercolor="primary"
			bodycolor="white"
			bgcolor="primary"
			header="Login to your account"
			status={status}
			body={show ? (
				<>
					<form>
						<label htmlFor="email">Email Address</label>
						<input type="input" className="form-control font-weight-bold" id="email" autoComplete="on" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.currentTarget.value) }} /><br />
						<label htmlFor="password">Password</label>
						<input type="password" className="form-control font-weight-bold" id="password" autoComplete="on" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} /><br />
						<button type="submit" className="btn btn-light" onClick={() => { handleLogin() }}>Login</button>
						<a className="btn btn-light" style={{ margin: 'auto 0.5em' }} href="http://ec2-18-232-152-188.compute-1.amazonaws.com:3000/connect/google">Connect to Google</a>
					</form>
				</>
			) : (
				<>
					<h5>Success</h5>
					<button type="submit" className="btn btn-light" onClick={() => { clearForm() }}>Add another account</button>
				</>
			)}
		/>
		
		<Modal
		size="sm"
		show={showError}
		onHide={() => setShowError(false)}
		aria-labelledby="example-modal-sizes-title-sm"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
				{errorTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{errorText}</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setShowError(false)} variant="secondary">
					Close
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
}

export default Login