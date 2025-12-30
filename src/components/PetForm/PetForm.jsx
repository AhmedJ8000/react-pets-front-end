import { useState, useEffect } from "react"
import * as petService from '../../services/petService'
import { useNavigate } from "react-router"

const PetForm = (props) => {
    const { petToUpdate } = props;

    const navigate = useNavigate()
    const [formState, setFormState] = useState(petToUpdate ? petToUpdate : {
        name: '', age: 0, breed: ''
    })
    useEffect(() => {
        if (petToUpdate) {
            setFormState(petToUpdate)
        }
    }, [petToUpdate])
    // THIS 100% OK TOO!!!!!
    // const [name, setName] = useState('')
    // const [age, setName] = useState(0)
    // const [breed, setName] = useState('')

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        const payload = { ...formState }
        payload.age = Number(payload.age)


        if (petToUpdate) {
            const updatedPet = await petService.update(petToUpdate._id, payload)

            if (updatedPet) {
                navigate('/');
            } else {
                console.log('something went wrong');
            }
        }
        else {
            const newPetCreated = await petService.create(payload)



            if (newPetCreated) {
                updatePets(newPetCreated)
                navigate('/')
            } else {
                console.log('something went wrong')
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