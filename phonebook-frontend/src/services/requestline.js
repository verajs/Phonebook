import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const replacePerson = (id, nametoset, numbertoset) => {
  const request = axios.put(`${baseUrl}/${id}`, {
    name: nametoset,
    number: numbertoset,
  });
  return request.then((response => response.data))

}
export default { getAll, addPerson, deletePerson, replacePerson };
