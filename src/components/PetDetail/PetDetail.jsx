import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
// Services
import * as petService from '../../services/petService';

function PetDetail({ findPetToUpdate, deletePet }) {
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getOnePet = async () => {
            const pet = await petService.show(id);
            setPet(pet);
        };
        if (id) getOnePet();
    }, [id]);

    const handleDelete = async () => {
        const deletedPet = await petService.deleteOne(id);
        deletePet(id);
        navigate('/');

        // if (deletedPet) {
        //     navigate('/');
        // }
        // else {
        //     console.log('something went wrong');
        // }
    }

    if (!id) return <h2>Loading...</h2>;
    if (!pet) return <h2>Loading...</h2>;

    return (
        <div className="shadedBorder">
            <h1>Pet Details</h1>
            <p>Name: {pet.name}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>

            <div>
                <Link onClick={() => findPetToUpdate(id)} to={`/pets/${id}/update`}>Edit</Link>
                <br />
                <br />
                <button onClick={handleDelete}>Delete Pet</button>
            </div>
        </div>
    );
}

export default PetDetail;
