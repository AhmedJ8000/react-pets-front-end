// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import './App.css'
// Services
import * as petService from './services/petService';
// Components
import PetList from './components/PetList/PetList';
import PetDetail from './components/PetDetail/PetDetail';
import PetForm from './components/PetForm/PetForm';
import { Link } from 'react-router';

const App = () => {
  const [pets, setPets] = useState([]);

  // We only want to fetch the pets components
  // Once! when the component first mounts
  useEffect(() => {
    const getAllPets = async () => {
      try {
        const pets = await petService.index();
        setPets(pets);
      } catch (error) {
        console.log(error);
      }
      const pets = await petService.index();
      setPets(pets);
    };
    getAllPets();
  }, []);

  const updatePets = (pet) => {
    setPets([...pets, pet]);
  }
  return (
    <>
    <div>
      <Link to="/">Home</Link> | {' '}
      <Link to="/pets/new">Create Pet</Link>
    </div>
      <Routes>
        <Route path='/' element={<PetList pets={pets} />} />
        <Route path='/pets/:id' element={<PetDetail/>} />
        <Route path='/pets/new' element={<PetForm updatePets={updatePets}/>}/>
      </Routes>
    </>
  )
};

export default App;
