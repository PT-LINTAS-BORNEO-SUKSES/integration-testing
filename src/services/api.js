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

const getStudentDetails = async (uid) => {
    try {
        const response = await axios.get(
            `https://api.edunex.id/getStudentDetails/${uid}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN()}`,
                },
            }
        );
        return response; // Return the response object
    } catch (error) {
        console.log("error getStudentDetail", error)
    }
}

const createStudent = async (studentData) => {
    try {
        const response = await axios.post(
            'https://api.edunex.id/data-management/sendStudentData', // Endpoint API untuk membuat siswa baru
            studentData, // Data siswa yang akan dikirim
            {
                headers: {
                    Authorization: `Bearer ${TOKEN()}`, // Token otorisasi untuk akses API
                    'Content-Type': 'application/json' // Mengatur tipe konten sebagai JSON
                }
            }
        );
        return response; // Mengembalikan respons dari API
    } catch (error) {
        console.log("error createStudent", error); // Menangani kesalahan
        throw error; // Melempar kesalahan untuk ditangani di tempat lain
    }
};

const deleteStudent = async (uid) => {
    try {
        const response = await axios.delete(
            `https://api.edunex.id/data-management/deleteStudent/${uid}`, // Endpoint API untuk menghapus siswa
            {
                headers: {
                    Authorization: `Bearer ${TOKEN()}`,
                }
            }
        );
        return response;
    } catch (error) {
        console.log("error deleteStudent", error);
        throw error;
    }
};

const updateStudent = async (uid,studentData) => {
    try {
        const response = await axios.put(
            `https://api.edunex.id/data-management/updateStudentData/${uid}`, // Endpoint untuk pembaruan data siswa
            studentData,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response; // Mengembalikan respons dari API
    } catch (error) {
        console.log("error updateStudent", error);
        throw error; // Melempar kesalahan untuk ditangani di tempat lain
    }
};

export {login, getStudentList, getStudentDetails, createStudent, updateStudent, deleteStudent};