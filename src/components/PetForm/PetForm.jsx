import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import * as petService from '../../services/petService'

const PetForm = ({ updatePets, updatePetInState }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        name: '',
        age: 0,
        breed: ''
    })

    useEffect(() => {
        if (!id) return

        const fetchPet = async () => {
            const pet = await petService.show(id)
            if (pet) setFormState(pet)
        }

        fetchPet()
    }, [id])

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        const payload = { ...formState, age: Number(formState.age) }

        if (id) {
            const updatedPet = await petService.update(id, payload)

            if (updatedPet) {
                updatePetInState(updatedPet)
                navigate('/');
            }
        }
        else
        {
            const newPetCreated = await petService.create(payload);
            if (newPetCreated){
                updatePets(newPetCreated);
                navigate('/');
            }
        }
    }

    return (
        <div>
            <h1>Pet Form</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} />

                <label htmlFor="age">Age</label>
                <input type="number" name="age" id="age" min={0} value={formState.age} onChange={handleChange} />

                <label htmlFor="breed">Breed</label>
                <input type="text" id="breed" name="breed" value={formState.breed} onChange={handleChange} />

                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default PetForm
// THIS 100% OK TOO!!!!!
// const [name, setName] = useState('')
// const [age, setName] = useState(0)
// const [breed, setName] = useState('')