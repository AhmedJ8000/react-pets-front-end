import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router'
import './App.css'

// Services
import * as petService from './services/petService'

// Components
import PetList from './components/PetList/PetList'
import PetDetail from './components/PetDetail/PetDetail'
import PetForm from './components/PetForm/PetForm'

function App() {
  const [pets, setPets] = useState([])

  // Fetch pets ONCE on mount
  useEffect(() => {
    const getAllPets = async () => {
      try {
        const petsData = await petService.index()
        setPets(petsData)
      } catch (error) {
        console.log(error)
      }
    }

    getAllPets()
  }, [])

  // Add newly created pet to state
  const updatePets = (newPet) => {
    setPets(prevPets => [...prevPets, newPet])
  }

  const updatePetInState = (updatedPet) => {
  setPets(prevPets =>
    prevPets.map(pet =>
      pet._id === updatedPet._id ? updatedPet : pet
    )
  )
}

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/pets/new">Create Pet</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PetList pets={pets} />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/pets/new" element={<PetForm updatePets={updatePets} />}/>
        <Route path="/pets/:id/update" element={<PetForm updatePetInState={updatePetInState}/>}/>
      </Routes>
    </>
  )
}

export default App
