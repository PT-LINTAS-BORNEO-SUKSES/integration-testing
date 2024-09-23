// src/redux/reducers/studentReducer.js
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
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE,
} from '../types/studentType';

const initialState = {
    loading: false,
    students: [],
    studentDetail: null,
    error: '',
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_STUDENTS_SUCCESS:
            return { loading: false, students: action.payload, error: '' };
        case FETCH_STUDENTS_FAILURE:
            return { loading: false, students: [], error: action.payload };

        case FETCH_STUDENT_DETAILS_REQUEST:
            return { ...state, loading: true, studentDetail: null, error: '' };
        case FETCH_STUDENT_DETAILS_SUCCESS:
            return { ...state, loading: false, studentDetail: action.payload, error: '' };
        case FETCH_STUDENT_DETAILS_FAILURE:
            return { ...state, loading: false, studentDetail: null, error: action.payload };

        case CREATE_STUDENT_REQUEST:
            return { ...state, loading: true };
        case CREATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                students: [...state.students, action.payload],
                error: '',
            };
        case CREATE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_STUDENT_REQUEST:
            return { ...state, loading: true };
        case UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                students: state.students.map(student =>
                    student.uid === action.payload.uid ? action.payload : student
                ),
                error: '',
            };
        case UPDATE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_STUDENT_REQUEST:
            return { ...state, loading: true };
        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                students: state.students.filter(student => student.uid !== action.payload),
                error: '',
            }
        case DELETE_STUDENT_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }
};


export default studentReducer;
