// src/App.jsx
import * as petService from './services/petService';
import { useState, useEffect } from 'react';

const App = () => {
  const [pets, setPets] = useState([]);

  return <h1>Hello world!</h1>;
};

export default App;
