// src/redux/actions/studentActions.js
// import axios from 'axios';
// import { TOKEN } from '../../helpers/localStorage';
import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    FETCH_STUDENT_DETAILS_REQUEST,
    FETCH_STUDENT_DETAILS_SUCCESS,
    FETCH_STUDENT_DETAILS_FAILURE,
    CREATE_STUDENT_REQUEST,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAILURE,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_FAILURE,
    UPDATE_STUDENT_SUCCESS,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE

} from '../types/studentType'; // Mengimpor action types
import { delStudent, getStudentDetails, getStudentList, postCreateStudent, putUpdateStudent } from '../../services/api';


//STUDENT LIST DATA

// Action Creators
export const fetchStudentsRequest = () => ({
    type: FETCH_STUDENTS_REQUEST,
});

export const fetchStudentsSuccess = (students) => ({
    type: FETCH_STUDENTS_SUCCESS,
    payload: students,
});

export const fetchStudentsFailure = (error) => ({
    type: FETCH_STUDENTS_FAILURE,
    payload: error,
});

// Async Action Creator
export const fetchStudents = () => {
    return async (dispatch) => {
        dispatch(fetchStudentsRequest());
        try {
            // const token = localStorage.getItem("token");
            // const response = await axios.get('https://api.edunex.id/getStudentData', {
            //     headers: {
            //         'Authorization': `Bearer ${TOKEN}`,
            //     },
            // });
            const response = await getStudentList();
            const students = response.data.payload; // Sesuaikan dengan struktur data Anda
            dispatch(fetchStudentsSuccess(students));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch(fetchStudentsFailure(errorMessage));
        }
    };
};



//STUDENT DETAIL DATA 
//Action Creators
export const fetchStudentDetailsRequest = () => ({
    type: FETCH_STUDENT_DETAILS_REQUEST,
});

export const fetchStudentDetailsSuccess = (student) => ({
    type: FETCH_STUDENT_DETAILS_SUCCESS,
    payload: student,
});

export const fetchStudentDetailsFailure = (error) => ({
    type: FETCH_STUDENT_DETAILS_FAILURE,
    payload: error,
});

// Async Action Creator
export const fetchStudentDetails = (uid) => {
    return async (dispatch) => {
        dispatch(fetchStudentDetailsRequest());
        try {
            // const token = localStorage.getItem("token");
            // const response = await axios.get(`https://api.edunex.id/getStudentDetails/${uid}`, {
            //     headers: {
            //         'Authorization': `Bearer ${TOKEN}`,
            //     },
            // });
            const response = await getStudentDetails(uid)
            const student = response.data.payload; // Sesuaikan dengan struktur data Anda
            dispatch(fetchStudentDetailsSuccess(student));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch(fetchStudentDetailsFailure(errorMessage));
        }
    };
};


//CREATE STUDENT
//Action Creators

export const createStudentRequst = () => ({
    type: CREATE_STUDENT_REQUEST,
});

export const createStudentSuccess = (student) => ({
    type: CREATE_STUDENT_SUCCESS,
    payload: student,
});

export const createStudentFailure = (error) => ({
    type: CREATE_STUDENT_FAILURE,
    payload: error,
});

export const createStudent = (studentData) => {
    return async (dispatch) => {
        console.log('create called', studentData);
        dispatch(createStudentRequst());
        try {
            // const token = localStorage.getItem("token");
            // const response = await axios.post('https://api.edunex.id/data-management/sendStudentData', studentData, {
            //     headers: {
            //         'Authorization': `Bearer ${TOKEN}`,
            //         'Content-Type': 'application/json',
            //     },
            // });
            const response = await postCreateStudent(studentData)
            console.log('response add data: ', response.data);
            
            dispatch(createStudentSuccess(response.data.payload));
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch(createStudentFailure(errorMessage))
        }
    };
};

//UPDATE STUDENT DATA
//Action Creators

export const updateStudentRequest = () => ({
    type: UPDATE_STUDENT_REQUEST,
});

export const updateStudentSuccess = (student) => ({
    type: UPDATE_STUDENT_SUCCESS,
    payload: student,
});

export const updateStudentFailure = (error) => ({
    type: UPDATE_STUDENT_FAILURE,
    payload: error,
});

export const updateStudent = (uid, studentData) => {
    return async (dispatch) => {
        dispatch(updateStudentRequest());
        try{
            // const token = localStorage.getItem('token');
            // const response = await axios.put(`https://api.edunex.id/data-management/updateStudentData/${uid}`, studentData, {
            //     headers: {
            //         'Authorization' : `Bearer ${TOKEN}`,
            //         'Content-Type' : 'application/json',
            //     },
            // });
            const response = await putUpdateStudent(uid, studentData)
            dispatch(updateStudentSuccess(response.data.payload));
        }catch(error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch(updateStudentFailure(errorMessage))
        }
    };
};


//DELETE STUDENT DATA
//Action Creators

export const deleteStudentRequest = () => ({
    type: DELETE_STUDENT_REQUEST,
});

export const deleteStudentSuccess = (uid) => ({
    type: DELETE_STUDENT_SUCCESS,
    payload: uid,
});

export const deleteStudentFailure = (error) => ({
    type: DELETE_STUDENT_FAILURE,
    payload: error,
});


export const deleteStudent = (uid) => {
    return async(dispatch) => {
        dispatch(deleteStudentRequest());
        try{
            // const token = localStorage.getItem('token');
            // const response = await axios.delete(`https://api.edunex.id/data-management/deleteStudent/${uid}`, {
            //     headers: {
            //         'Authorization' : `Bearer ${TOKEN}`,
            //         'Content-Type' : 'application/json',
            //     }
            // })
            const response = await delStudent(uid)
            dispatch(deleteStudentSuccess(uid))
            return response;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            dispatch(deleteStudentFailure(errorMessage))
        }
    };
};

