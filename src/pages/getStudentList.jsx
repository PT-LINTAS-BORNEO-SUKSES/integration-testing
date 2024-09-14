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
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await deleteStudent(uid);
                if (response.status === 200) {
                    getStudentListData();
                } else {
                    console.error("Failed to delete student, server response:", response);
                    setError("Failed to delete student. Please check the console for more information.");
                }
            } catch (error) {
                console.error("Error deleting student:", error.response || error);
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
                                <div className="action">
                                    <Link to={`/student-detail/${student.uid}`} className="view-details-link">
                                        Detail
                                    </Link>
                                    <Link to={`/edit-student/${student.uid}`} className="edit-button">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(student.uid)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
