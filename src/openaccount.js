import { React, useContext, useState, setState, useEffect } from 'react';
import { Card, UserContext } from './context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCookie } from './util';
import { API_URL } from './config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AccountSelector } from './accounts';


const OpenAccount = () => {
	const [	showModal, setShowModal ]				= useState(false);
	const [ modalTitle, setModalTitle ]				= useState("");
	const [ modalText, setModalText ]				= useState("");
	const [ depositAmount, setDepositAmount ]		= useState(0);
	const [ accountType, setAccountType ]			= useState("");
	const [ newAccount, setNewAccount ]				= useState(null);

	const navigate = useNavigate();

	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});


	function createAccount() {
		var newAccount;

		if(accountType === '') {
			console.log(`account Type is not valid`);
			return;
		}

		if(Number(depositAmount) <= 0) {
			console.log(`deposit amount is not valid.`);
			return;
		}
		
		console.log(`createAccount - account type = ${accountType}, and deposit amount = ${depositAmount}`);
		console.log(`typeof accountType = ${typeof accountType}`);

		const accountCreateLink = `${API_URL}/accounts/create/${getCookie('email')}/${accountType}`;
		console.log(`accountCreateLink = ${accountCreateLink}`);

		//const creationResults = 
		axios.get(accountCreateLink)
		.then((res) => {
			console.log(`account creation results = ${res.data.ok}`);
			console.log(`1111111new account info = ${JSON.stringify(res.data.data, null, 4)}`);

			setNewAccount(res.data.data);

			//const depositLink = `${API_URL}/accounts/deposit/${newAccount.accountNumber}/${depositAmount}`;
			const depositLink = `${API_URL}/accounts/deposit/${res.data.data.accountNumber}/${depositAmount}`;
			console.log(`depositLink = ${depositLink}`);
	
					//call API for updated account information
			axios.get(depositLink)
				.then((res) => {
					console.log(`deposit after account creation: AccountInfo res.ok = ${res.data.ok}`);
					setNewAccount(res.data.data);
					if(res.data.ok == true) {
						console.log(`data = ${JSON.stringify(res.data.data, null, 4)}`);
					}
				})
				.catch((err) => { return err; });

			return res.data.data;
		})
		.catch((err) => {
			return err;
		});

		console.log(`new account = ${JSON.stringify(newAccount, null, 4)}`);



		//console.log(`creation results = ${creationResults.data.ok}`);

		setModalTitle(`Account Creation Successful!`);
		setModalText(`hello`);//${currencyFormat.format(amount)} successfully deposited.`);
		setShowModal(true);

		return;
	}

	//onChange={e => handleAccountSelectionChange(e)}
	return (
	<>
  <Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header="Open New Account"
		body={(
		<>
			<div class="row align-items-start">
				<div class="card" style={{border: "none", width: "45%", margin: "auto", height: "400px"}}>
					<div class="card-body">
						<h5 class="card-title">Account Type</h5>
						<div id="originContainer" class="container col">
							<select id="account-type" class="form-select" size="3"
								aria-label="size 3 select example" style={{width: "100%", margin: "1em auto"}}
								onChange={e => setAccountType(e.currentTarget.value)}>
								<option value="">Select an account type</option>
								<option value="savings">Savings Account</option>
								<option value="checking">Checking Account</option>
							</select>
						</div>
					</div>
				</div>
				<div class="card" style={{border: "none", width: "45%", margin: "auto", height: "400px"}}>
					<div class="card-body">
						<h5 class="card-title">Initial Deposit</h5>
						<label htmlFor="transfer-amount" className="font-weight-bold">Initial Deposit Amount</label>
						<input type="input" className="form-control font-weight-bold" id="deposit-amount" autoComplete="on" placeholder="$0.00" value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)} /><br/>
						<button type="submit" className="btn btn-light" onClick={e => createAccount()}>Create Account</button>
					</div>
				</div>
			</div>
		</>
		)}
		/>
		<Modal
		size="sm"
		show={showModal}
		onHide={() => setShowModal(false)}
		aria-labelledby="example-modal-sizes-title-sm"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
				{modalTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{modalText}</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => {
					setShowModal(false);
					setTimeout(() => {
						console.log(`redirecting to main page ... `);
						navigate('/');
					}, 1500);
				}} variant="secondary">
					Close
				</Button>
			</Modal.Footer>
		</Modal>

	</>);
}



export default OpenAccount;