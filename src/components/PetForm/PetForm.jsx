import React, { useState } from 'react'
import * as petService from '../../services/petService';
import { useNavigate } from 'react-router';

const PetForm = (props) => {
    const { updatePets } = props;
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '', age: 0, breed: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const payload = { ...formState };
        payload.age = Number(payload.age);
        const data = await petService.create(payload);
        if (data) {
            updatePets(data);
            navigate('/');
        }
        console.log(formState);
    }
    return (
        <div>
            <h1>Pet Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id='name' value={formState.name} onChange={handleChange} />

                <label htmlFor="age">Age</label>
                <input type="number" name='age' id='age' min={0} value={formState.age} onChange={handleChange} />

                <label htmlFor="breed">Breed</label>
                <input type="text" name='breed' id='breed' value={formState.breed} onChange={handleChange} />

                <button type='submit'>Save Pet</button>

            </form>
        </div>
    )
}

export default PetForm