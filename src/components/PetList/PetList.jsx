import { Link } from 'react-router';
const PetList = ({ pets }) => {
    
    if (!pets){
        return <h1>Loading....</h1>
    }

    return (
        <div>
            <h1>Pet List</h1>
            {!pets.length ? <div>No Pets Found</div> : <ul>
                {pets.map(
                    (onePet) => (
                        <li key={onePet._id}>
                            <Link to={`/pets/${onePet._id}`}>{onePet.name}</Link>
                        </li>
                    ))}
            </ul>}
        </div>
    )
}

export default PetList