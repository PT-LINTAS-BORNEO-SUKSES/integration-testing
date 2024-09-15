import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../services/api';
import './style.css'; // Import CSS file for styling

// Utility function to generate a random password
const generateRandomPassword = (length = 8) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        nisn: '',
        alamat: '',
        agama: '',
        gender: '',
        kelas: '',
        password: generateRandomPassword(), // Default random password
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createStudent(formData); // API call to create a student
            navigate('/student-list'); // Navigate back to the student list
            alert('Data Berhasil di Tambahkan')
        } catch (error) {
            setError("Failed to create student. Please check the console for more information.");
        }
    };
    
    const handleCancel = () => {
        navigate('/student-list'); // Redirect ke halaman daftar siswa jika batal
    };

    return (
        <div className="create-student-container">
            <h1>Add New Student</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    NISN:
                    <input
                        type="text"
                        name="nisn"
                        value={formData.nisn}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Alamat:
                    <input
                        type="text"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Agama:
                    <input
                        type="text"
                        name="agama"
                        value={formData.agama}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Gender:
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="pria">Laki-laki</option>
                        <option value="wanita">perempuan</option>
                    </select>
                </label>
                <label>
                    Kelas:
                    <input
                        type="text"
                        name="kelas"
                        value={formData.kelas}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add Student</button>
                <button id='cancel' type="button" onClick={handleCancel} className="cancel-button">
                    Batal
                </button>
            </form>
        </div>
    );
};

export default CreateStudent;
