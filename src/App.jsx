import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'

import './App.css'
// Services
import * as petService from './services/petService'
// Components
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm'
import EditPetForm from './components/V2/EditPetForm/EditPetForm';
import { Link } from 'react-router';

function App() {
  const [pets, setPets] = useState([]);
  const [petToUpdate, setPetToUpdate] = useState(null)

  // // we only want to fetch the pets list
  // // ONCE, when the component first mounts
  useEffect(() => {
    const getAllPets = async () => {
      try {
        const pets = await petService.index()
        setPets(pets)
      } catch (error) {
        console.log(error)
      }
    }

    getAllPets()
  }, [])

  const updatePets = (pet) => {
    setPets([...pets, pet])
  }

  const deletePet = (id) => {
    const newPetList = pets.filter(pet => pet._id !== id)
    setPets(newPetList);
  }

  const updateOnePet = (updatedPet) => {
    const newUpdatedPet = pets.map((onePet) => {
      if (onePet._id === updatedPet._id) {
        return updatedPet
      }
      else {
        return onePet
      }
    })
    setPets(newUpdatedPet);
  }

  // This function just used to determine what pet in the
  // detail page I clicked on
  const findPetToUpdate = (petId) => {
    const foundPet = pets.find(pet => pet._id === petId)
    setPetToUpdate(foundPet)
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | {' '}
        <Link to="/pets/new">Create Pet</Link>
      </nav>

      <Routes>
        {/* EJS STYLE */}
        <Route path="/pets/:id/edit" element={<EditPetForm />} />

        {/* LIFT STATE STYLE */}
        <Route path='/' element={<PetList pets={pets} />} />
        {/* <Route path='/' element={ <PetListV2 />} /> */}
        <Route path="/pets/:id" element={<PetDetail findPetToUpdate={findPetToUpdate} deletePet={deletePet}/>} />
        <Route path="/pets/new" element={<PetForm updatePets={updatePets} />} />
        <Route path="/pets/:id/update" element={<EditPetForm updateOnePet={updateOnePet} />} />

      </Routes>
    </>
  )

}

export default App