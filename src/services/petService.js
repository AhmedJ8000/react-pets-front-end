import axios from 'axios'
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
  try{
    const response = await axios.get(BASE_URL)

    return response.data.pets
  }catch(error){
    console.log(error)
  }
}

const show = async (id) => {
  try{
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data.pet
  }catch(error){
    console.log(error)
  }
}

const create = async (formData)=> {
  try{
    const response = await axios.post(BASE_URL, formData)
    return response.data.pet
  }catch(error){
    console.log(error)
  }
}

const update = async (petId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${petId}`, formData)
    return response.data.pet
  } catch (error) {
    console.log(error)
  }
}

const deleteOne = async (petId) => {
  try{
    const response = await axios.delete(`${BASE_URL}/${petId}`)
    return response.data.pet
  }catch(error){
    console.log(error)
  }
}

export {
  index,
  show,
  update,
  create,
  deleteOne
}