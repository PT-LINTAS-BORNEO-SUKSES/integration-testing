// StudentDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentDetails } from '../services/api';

const StudentDetail = () => {
    const { uid } = useParams(); // Get UID from URL parameters
    const navigate = useNavigate(); // Hook to navigate programmatically
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
                setError("Failed to fetch student details. Please check the console for more information.");
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
    if (!studentDetail) return <div>No student detail available.</div>;

    return (
        <div>
            <h1>Student Detail</h1>
            <button onClick={() => navigate('/student-list')} className="back-button">
                Back to Student List
            </button>
            <ul>
                <li><strong>Nama:</strong> {studentDetail.nama}</li>
                <li><strong>NISN:</strong> {studentDetail.nisn}</li>
                <li><strong>Kelas:</strong> {studentDetail.kelas}</li>
                <li><strong>Created At:</strong> {studentDetail.createdAt}</li>
                <li><strong>Updated At:</strong> {studentDetail.updatedAt}</li>
            </ul>
        </div>
    );
};

export default StudentDetail;
