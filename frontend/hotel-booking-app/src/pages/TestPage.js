import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestPage = () => {
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
        const username = 'admin';
        const password = 'admin';
        
        const token = btoa(`${username}:${password}`); // (`${username}:${password}`).toString(); //base64
        
        axios.get('http://localhost:8080/', {
          headers: {
            'Authorization': `Basic ${token}`,
          },
          withCredentials: true // this is important for sending cookies
        })
        .then(response => {
          setData(response.data);
          console.log(data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });

        console.log("data consol: "+ data);
    }

    useEffect(() => {
        fetchData();
    }
    , []);
    

        return (
            <div>
                <h1>Test Page</h1>
            </div>
        );
    };

export default TestPage;