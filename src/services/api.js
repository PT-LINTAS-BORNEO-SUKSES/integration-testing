// Import axios
import axios from 'axios';
import {TOKEN} from "../helpers/localStorage.js";


// Fungsi untuk melakukan permintaan GET
const login = async (username, passsword) => {
    try{
        const response = await axios.post(
            'https://api.edunex.id/login',
            {
                "username": username,
                "password": passsword
            },
            {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            )
        console.log("data login", response);
        return response
    }catch (error) {
        console.log("gagal login", error)
    }
}

const getStudentList = async () => {
    try{
        const response = await axios.get(
            'https://api.edunex.id/getStudentData',
            {
                headers: {
                    Authorization: `Bearer ${TOKEN()}`,
                }
            }
        )
        return response;
    }catch (error) {
        console.log("error getStudentList", error)
    }
}

export {login, getStudentList};