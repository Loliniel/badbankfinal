import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Card, UserContext } from './context';

	
const AllData = (props) => {
	const ctx = React.useContext(UserContext);
  
  
 /* const tableData = ctx.users.map((e, i) =>
		<tr key={e.name+i}>
			<td>{e.name}</td>
			<td>{e.email}</td>
			<td>{e.password}</td>
			<td>{e.balance}</td>
		</tr>
	);*/
	
	
	return (<></>)
  /*return (
  		<Card
		headercolor="primary"
		bodycolor="white"
		bgcolor="primary"
		header="Deposit"
		width="50rem"
		body={(
			<>
			<table key="allDataTable" className="table">
				<thead>
					<tr>
						<th scope="col">Email</th>
						<th scope="col">Name</th>
						<th scope="col">Password</th>
						<th scope="col">Balance</th>
					</tr>
				</thead>
				<tbody>
					{tableData}
				</tbody>
			</table>
			</>
		)}
		/>
  )*/
}

export default AllData