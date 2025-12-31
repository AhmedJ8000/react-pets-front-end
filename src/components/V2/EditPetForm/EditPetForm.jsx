import { useEffect, useState } from "react"
import * as petService from '../../../services/petService'
import { useNavigate, useParams } from "react-router"

const EditPetForm = ({ updateOnePet }) => {
    const [formState, setFormState] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(
        () => {
            const getOnePet = async (id) => {
                const pet = await petService.show(id)
                setFormState(pet)
            }

            if (id) getOnePet(id)
        }, [id]
    )

    if (!id) return <h1>Loading...</h1>
    if (!formState) return <h1>Loading..</h1>

    const handleChange = (evt) => {
        const { name, value } = evt.target
        const newFormState = { ...formState, [name]: value }
        setFormState(newFormState)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        const payload = { ...formState }
        payload.age = Number(payload.age)

        const updatedPet = await petService.update(id, payload)

        if (updatedPet) {
            updateOnePet(updatedPet);
            navigate('/')
        } else {
            console.log('something went wrong')
        }

    }

    return (
        <div className="shadedBorder">
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

export default EditPetForm