// StudentDetailModal.jsx
import React, { useEffect, useState } from 'react';
import './style.css'; // Import styles if needed
import { getStudentDetails } from '../services/api';

const StudentDetailModal = ({ uid, onClose }) => {
    const [studentDetail, setStudentDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await getStudentDetails(uid);
                if (response && response.data && response.data.payload) {
                    setStudentDetail(response.data.payload);
                } else {
                    throw new Error('No data available');
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
                setError("Failed to load student details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchStudentDetail();
        }
    }, [uid]);

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
