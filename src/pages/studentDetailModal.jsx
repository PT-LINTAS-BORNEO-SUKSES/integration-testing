import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentDetails } from '../redux/actions/studentActions';
import './style.css';

const StudentDetailModal = ({ uid, onClose }) => {
    const dispatch = useDispatch();
    const { studentDetail, loading, error } = useSelector((state) => state.student); // Ambil state dari Redux

    useEffect(() => {
        if (uid) {
            dispatch(fetchStudentDetails(uid)); // Panggil action untuk mengambil detail siswa
        }
    }, [uid, dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!studentDetail) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Student Detail</h2>
                <ul>
                    <li><strong>Nama:</strong> {studentDetail.nama}</li>
                    <li><strong>NISN:</strong> {studentDetail.nisn}</li>
                    <li><strong>Kelas:</strong> {studentDetail.kelas}</li>
                    <li><strong>Created At:</strong> {studentDetail.createdAt}</li>
                    <li><strong>Updated At:</strong> {studentDetail.updatedAt}</li>
                </ul>
            </div>
        </div>
    );
};

export default StudentDetailModal;
