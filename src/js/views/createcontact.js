import React, { useContext, useState } from "react";
import "../../styles/createcontact.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const CreateContact = () => {

	const {store, actions} = useContext(Context);

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')

	const onSubmit = () => {
		if(fullName === '' ) {
			alert('Enter Full Name!')
		} else if(email === '' || !email.includes('@')) {
			alert('Enter Correct Email!')
		} else if(phone === '' || phone.length !== 10) {
			alert('Enter Correct Phone Number!')
		} else if(address === '' ) {
			alert('Enter Address!')
		} else {
			// Call Create Contact API Here....
			const contact = {
				"full_name": fullName,
				"email": email,
				"agenda_slug": store.agenda,
				"address": address,
				"phone": phone
			}

			fetch('https://assets.breatheco.de/apis/fake/contact/', {
				method: "POST",
				body: JSON.stringify(contact),
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
				setFullName('');
				setEmail('');
				setPhone('');
				setAddress('');
				alert('Successfully Added New Contact!')
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
		}
	}


	return (
		<div className="container">
			<div class="row g-3 mt-5">
				<div class="col-12">
					<label for="fullName" class="form-label">Full Name</label>
					<input 
						type="text" 
						class="form-control" 
						id="fullName" 
						placeholder='Enter Full Name' 
						value={fullName} onChange={(e) => setFullName(e.target.value)} 
					/>
				</div>
				<div class="col-12">
					<label for="email" class="form-label">Email</label>
					<input type="text" class="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div class="col-12">
					<label for="phone" class="form-label">Phone</label>
					<input type="text" class="form-control" id="phone" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
				</div>
				<div class="col-12">
					<label for="address" class="form-label">Address</label>
					<input type="text" class="form-control" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
				</div>
				<div class="col-12">
					<button onClick={onSubmit} type="submit" class="btn btn-primary">Submit</button>
				</div>
				<div>
					<Link to='/'>or get back to contacts</Link>
				</div>
			</div>
		</div>
	)
};

export default CreateContact;