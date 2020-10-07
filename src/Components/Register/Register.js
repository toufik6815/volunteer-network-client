import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import './Register.css'
import { Link, useParams } from 'react-router-dom';

const Register = () => {
    const { title } = useParams()
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const {res} = useParams();
    const [selected, setSelected] = useState({
        date: new Date(),
        title: title
    })

    const handleDate = () => {
        const newInfo = { ...selected};
        const date = document.getElementById('date').value;
        newInfo.date = date;
        setSelected(newInfo);
        console.log(date)
    }

    const onSubmit = (data) => {
        const orderDetails = { ...loggedInUser, ...selected}
        fetch('https://polar-fjord-55938.herokuapp.com/addWork', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
      
            
        <div className="container">
            <from >
                <div className="ship_from">
                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}

                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                    {errors.email && <span className="error">Email is required</span>}

                    < input type="date" defaultValue={new Date()}
                        onChange={handleDate} name="date" id="date" ref={register({ required: true })} placeholder='Your Date' />
                    {errors.address && <span className="error">Address is required</span>}

                    < input name="title" defaultValue={title} ref={register({ required: true })} placeholder='Title' />
                    {errors.phone && <span className="error">Phone Number is required</span>}

                    < input name="country" ref={register({ required: true })} placeholder='Your Country Name' />
                    {errors.country && <span className="error">Country Name is required</span>}

                    <Link to='/events'><input className="fromSubmit" onClick={onSubmit} type="submit" /></Link>
                </div>
            </from>
            
        </div>
    );
};

export default Register;