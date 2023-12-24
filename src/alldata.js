import { Switch, Route } from 'react-router-dom'
import { Card, UserContext } from './context';
import { React, useContext, useState, setState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './config';
import axios from "axios";
import { getCookie, setCookie } from './util';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

	
const AllData = (props) => {
	const [ users, setUsers ]					= useState(null);

	useEffect(() => {
	//function getAllUsers() {
	//	console.log(`API_URL = ${API_URL}`);
		
		axios.get(API_URL+"/user/all").then((res) => {
			console.log(`${JSON.stringify(res.data, null, 4)}`);
			setUsers(res.data);
		//if (res.data.ok === true) {
		});
	
	}, []);

	
	
	//return (<></>)
  return (
  		<Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header="All Users"
		width="50rem"
		body={(
			<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Email</th>
						<th scope="col">Name</th>
						<th scope="col">Password</th>
						<th scope="col">Account Type</th>
						<th scope="col">Access Level</th>
					</tr>
				</thead>
				<tbody>
				{users && users.map((e) => (
					<tr>
						<td>{e.email}</td>
						<td>{e.name}</td>
						<td>********</td>
						<td>{e.type}</td>
						<td>{e.accessLevel}</td>
					</tr>
				))}
				</tbody>
			</table>
			</>
		)}
		/>
  )
}

export default AllData