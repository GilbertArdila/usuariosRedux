import axios from 'axios';

export const fectchData=async(setUsers)=>{
    const response=await axios.get('https://jsonplaceholder.typicode.com/users')
    setUsers(response.data)
   }
 
