import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudentList, deleteStudent } from '../services/api';
import './style.css';

const StudentList = () => {
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);

    const getStudentListData = async () => {
        try {
            const response = await getStudentList();
            if (response && response.data && response.data.payload) {
                setStudentData(response.data.payload);
            } else {
                throw new Error('No data available');
            }
        } catch (error) {
            console.error("Error fetching student list:", error);
            setError("Failed to load student list. Please check the console for more information.");
        }
    };

    useEffect(() => {
        getStudentListData();
    }, []);

    const handleDelete = async (uid) => {
        console.log("Attempting to delete student with UID:", uid); // Log UID
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await deleteStudent(uid);
                console.log("Successfully deleted student with UID:", uid); // Log success
                console.log("Delete response:", response); // Log the response
                // Refresh the student list after deletion
                getStudentListData();
            } catch (error) {
                console.error("Error deleting student:", error);
                setError("Failed to delete student. Please check the console for more information.");
            }
        }
    };

    return (
        <div>
            <h1>Student List</h1>
            <Link to="/create-student" className="add-student-button">
                Add Student
            </Link>
            {error && <div className="error-message">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>NISN</th>
                        <th>Kelas</th>
                        <th>Dibuat</th>
                        <th>Diperbaharui</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student, index) => (
                        <tr key={index}>
                            <td>{student.no}</td>
                            <td>{student.nama}</td>
                            <td>{student.nisn}</td>
                            <td>{student.kelas}</td>
                            <td>{student.createdAt}</td>
                            <td>{student.updatedAt}</td>
                            <td>
                                <Link to={`/student-detail/${student.uid}`} className="view-details-link">
                                    View Details
                                </Link>
                                <button 
                                    onClick={() => handleDelete(student.uid)} 
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
