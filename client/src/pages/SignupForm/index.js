import React, {useState} from 'react';
import {useMutation} from '@apollo-react-hooks';
import Auth from '../utils/Auth';
import ADD_USER from '../../utils/mutations';



const signUp=() => {

    const [formState, setFormState] = useState({username: '', email: '', password: ''})
    //user mutation goes here
    const[addUser, {error}] = useMutation(ADD_USER);

    const handleChange = e => {
        const{name, value} = e.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        try{
            const{data} = await addUser({
                variables: {...formState}
            })

            Auth.login(data.addUser.token);
        } catch(e) {
            console.error(e)
        }
    };


    return(
        <div>
            <h2>Sign Up Below</h2>
        <form>
            <div>
                <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="username"
                    id="username"
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                />

                <button type="submit">Finish Signup</button>
            </div>
        </form>
        {error && <div>Something Went Wrong</div>}
        </div>
    )
};

export default signUp;