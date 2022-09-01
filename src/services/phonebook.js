import axios from "axios";
const url = 'http://localhost:3001/persons'

const createPerson = personObject => {
    const request = axios.post(url, personObject)
    return request.then(response => response.data)
}

const getAllPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const deletePersonWithId = (id) =>{
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const updatePersons = (id, personObject) => {
    const request = axios.put(`${url}/${id}`, personObject)
    return request.then(response => response.data)
}

export default {createPerson, getAllPersons, deletePersonWithId, updatePersons}