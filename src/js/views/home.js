import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {

	const {store, actions} = useContext(Context);
	const [contactList, setContactList] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		initializeAgenda()
		fetchContacts()
	},[])

	const initializeAgenda = () => {
		actions.changeAgenda('4geeks_agenda')
	}

	const fetchContacts = () => {
		fetch('https://assets.breatheco.de/apis/fake/contact/agenda/' + store.agenda, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is where your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			setContactList(data);
		})
		.catch(error => {
			//error handling
			console.log(error);
    	});
	}

	const deleteContact = (contactId) => {
		fetch('https://assets.breatheco.de/apis/fake/contact/' + contactId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is where your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			alert('Successfully Deleted Contact!')
			fetchContacts();
		})
		.catch(error => {
			//error handling
			console.log(error);
    	});
	}

	const showContacts = () => {
		return contactList.map((item, index) => {
			return (
				<li
					key={index}
					className="list-group-item d-flex justify-content-between"
					>
						<div>
							<Link to={'/contact/' + item.id}><h3>{item.full_name}</h3></Link>
							<p>{item.email}</p>
						</div>
						<button className="btn btn-success" onClick={() => {}}>
								Edit Contact
						</button>
						<button className="btn btn-success" onClick={() => deleteContact(item.id)}>
								Delete Contact
						</button>
				</li>
			)
		})
	}

	return (
		<div className="container">
			<div className="d-flex justify-content-between mt-4">
				<h1>Contact List</h1>
				<button className="btn btn-success" onClick={() => navigate('/create-contact')}>
					Add new Contact
				</button>
			</div>
			<ul className="list-group mt-4">
				{showContacts()}
			</ul>
		</div>
	)
};

export default Home;
