// src/pages/getStudentList.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../redux/actions/studentActions';
import StudentDetailModal from './studentDetailModal';
import './style.css';

const StudentList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, students, error } = useSelector(state => state.student);
    const [selectedStudentUid, setSelectedStudentUid] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login'); // Redirect to login if token is not present
        } else {
            dispatch(fetchStudents());
        }
    }, [dispatch, navigate]);

    const handleDelete = (uid) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            dispatch(deleteStudent(uid)); // Dispatch the deleteStudent action
        }
    };

    const openModal = (uid) => {
        setSelectedStudentUid(uid);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStudentUid(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Student List</h1>
            <Link to="/create-student" className="add-student-button">Add Student</Link>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <p>Loading...</p>
            ) : (
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
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.no}</td>
                                <td>{student.nama}</td>
                                <td>{student.nisn}</td>
                                <td>{student.kelas}</td>
                                <td>{student.createdAt}</td>
                                <td>{student.updatedAt}</td>
                                <td>
                                    <div className="action">
                                        <button onClick={() => openModal(student.uid)} className="view-details-button">Detail</button>
                                        <Link to={`/edit-student/${student.uid}`} className="edit-button">Edit</Link>
                                        <button onClick={() => handleDelete(student.uid)} className="delete-button">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <StudentDetailModal uid={selectedStudentUid} onClose={closeModal} />
            )}
        </div>
    );
};

export default StudentList;
