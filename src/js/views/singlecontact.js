import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { useParams } from "react-router";

const SingleContact = () => {

    const params = useParams();
    const [contact, setContact] = useState()

    useEffect(() => {
        fetchSingleContact();
    },[])


    const fetchSingleContact = () => {
        fetch('https://assets.breatheco.de/apis/fake/contact/' + params.id, {
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
            setContact(data)
		})
		.catch(error => {
			//error handling
			console.log(error);
    	});
    }

    return (
        <div className="text-center mt-5">
            <h1>Contact</h1>
            {contact ? (
                <div>
                    <h2>{contact.full_name}</h2>
                    <h2>{contact.email}</h2>
                    <h2>{contact.phone}</h2>
                    <h2>{contact.address}</h2>
                    <h2>{contact.agenda_slug}</h2>
                </div>
            ) : (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
};

export default SingleContact