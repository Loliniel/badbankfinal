import { API_URL } from './config';
import axios from "axios";
import { useState, useContext } from 'react'
//import React from 'react'
import { Switch, Route, useNavigate } from 'react-router-dom'
import { Card, UserContext } from './context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCookie, setCookie } from './util';


const CreateAccount = (props) => {
	const [show, setShow]         = useState(true);
	const [status, setStatus]     = useState('');
	const [name, setName]         = useState('');
	const [email, setEmail]       = useState('');
	const [password, setPassword] = useState('');
	const [showError, setShowError]					= useState(false);
	const [errorTitle, setErrorTitle]				= useState("");
	const [errorText, setErrorText]					= useState("");
	const { authenticated, setAuthenticated } = useContext(UserContext);
	//const ctx = React.useContext(UserContext);

	const navigate = useNavigate();
	
	
	function isValidEmail(emailToTest) {
		const emailRegEx = /^([\w\-.])+@([\w\-])+\.([\w\-\.]{2,4})$/;

		console.log(`email to test = ${emailToTest}`);
		
		if(!emailToTest.match(emailRegEx)) {
			console.log(`isValidEmail returning false.`);
			return false;
		}
		
		console.log(`isValidEmail returning true.`);
		return true;
	}
	
	
	function validateEmail(event) {
		const emailRegEx = /^([\w\-.])+@([\w\-])+\.([\w\-\.]{2,4})$/;
		var emailField = event.target;// document.getElementById("email");
		var newEmail = emailField.value;
		
		if(isValidEmail(newEmail)) {//newEmail.match(emailRegEx)) {
			emailField.classList.remove("bg-danger");
			emailField.classList.add("bg-success");
			//console.log(`${newEmail} = valid`);
		} else {
			//console.log(`${newEmail} = invalid`);
			emailField.classList.remove("bg-success");
			emailField.classList.add("bg-danger");
		}
		
//		console.log(`email = "${newEmail}"`);
		
		if(email == "") {
//			console.log("email is blank");
			emailField.classList.remove("bg-danger");
			emailField.classList.remove("bg-success");
		}
		
		setEmail(event.target.value);
		
	//	console.log(event.target.value);
	}

	function validate(field, label) {
		console.log(`validating ${field} with ${label}`);

		if (!field) {
			setErrorTitle(`Error!`);
			setErrorText(`Error: ${label} field is blank!`);
			setShowError(true);
			setStatus('Error: ' + label);
			setTimeout(() => setStatus(''),3000);
			return false;
		}
		
		if(label == "email") {
			//console.log(`isValidEmail = ${isValidEmail(field)}`);
			if(!isValidEmail(field)) {
				//console.log(`isValidEmail returned false?`);
				setErrorTitle(`Error!`);
				setErrorText(`Error: email is not valid!`);
				setShowError(true);
				
				return false;
			}
		}
		
		if(label == "password") {
			if(!isValidPassword(field)) {
				setErrorTitle(`Error!`);
				setErrorText(`Error: password is not valid!`);
				setShowError(true);
				
				return false;
			}
		}
			
		return true;
	}

	
	function isValidPassword(passwordToTest) {
		var minMaxLength = /^[\s\S]{8,32}$/,
		upper = /[A-Z]/,
		lower = /[a-z]/,
		number = /[0-9]/,
		special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

		if (minMaxLength.test(passwordToTest) &&
			upper.test(passwordToTest) &&
			lower.test(passwordToTest) &&
			number.test(passwordToTest) &&
			special.test(passwordToTest)) {	
			return true;
		}
		
		return false;
	}
		
		
	function validatePassword(event) {
		var passwordField = document.getElementById("password");
		var newPassword = event.currentTarget.value;

		var minMaxLength = /^[\s\S]{8,32}$/,
		upper = /[A-Z]/,
		lower = /[a-z]/,
		number = /[0-9]/,
		special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
		
	
		if(isValidPassword(newPassword)) {
			passwordField.classList.remove("bg-danger");
			passwordField.classList.add("bg-success");
		} else {
			passwordField.classList.remove("bg-success");
			passwordField.classList.add("bg-danger");
		}

		if(newPassword == "") {
			passwordField.classList.remove("bg-success");
			passwordField.classList.remove("bg-danger");
		}			
		
		setPassword(newPassword);

		return false;
	}


	function handleCreate() {
		console.log(name,email,password);
		if (!validate(name,     'name'))     return;
		if (!validate(email,    'email'))    return;
		if (!validate(password, 'password')) return;

		console.log(`email = ${email}\npassword = ${password}`);
		console.log(`API_URL = ${API_URL}`);
			axios.get(API_URL+"/user/create/"+name+"/"+email+"/"+password)
			.then((res) => {
			if (res.data.ok === true) {
				setCookie('name', res.data.data.name, 7);
				setCookie('email', res.data.data.email, 7);
				setCookie('id', res.data.data._id, 7);
				setCookie('accessLevel', res.data.data.accessLevel, 7);
				setAuthenticated(true);

				setTimeout(() => {
					console.log(`redirecting to main page ... `);
					navigate('/');
				}, 1500);
			} else {
				console.log(`Ok false: ${res.data.data}`);
			}
		});

		//ctx.users.push({name,email,password,balance:0});
		setShow(false);
	}    

	function clearForm(){
		setName('');
		setEmail('');
		setPassword('');
		setShow(true);
	}

	return (
	<>
		<Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header="Create Account"
		status={status}
		body={show ? (
		<>
		<div class="row align-items-start">
			<form className="position-absolute" style={{ margin: "auto 1em", "bottom": "25px", "width": "66%" }}>
				<label htmlFor="name">Name</label>
				<input type="input" className="form-control font-weight-bold" id="name" autoComplete="on" placeholder="Enter name" value={name} onChange={(e) => {setName(e.currentTarget.value)}} /><br/>
				<label htmlFor="email">Email Address</label>
				<input type="input" className="form-control font-weight-bold" id="email" autoComplete="on" placeholder="Enter email" value={email} onChange={(e) => {validateEmail(e)}}/><br/>
				<label htmlFor="password">Password <span data-toggle="tooltip" title="8 characters minimum, one uppercase, one lowercase, one number, and one special character.">?</span></label>
				<input type="password" className="form-control font-weight-bold" id="password" autoComplete="on" placeholder="Enter password" value={password} onChange={(e) => {validatePassword(e)}} /><br/>
				<button type="submit" className="btn btn-light" onClick={() => {handleCreate()}}>Create Account</button>
			</form>
		</div>
		</>
		):(
			<>
				<h5>Success</h5>
				<form className="position-absolute" style={{"bottom": "25px"}}>
					<button type="button" className="btn btn-light" onClick={clearForm}>Add another account</button>
				</form>
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

export default CreateAccount