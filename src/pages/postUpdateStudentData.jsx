import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentDetails, updateStudent } from '../services/api';

const genderOptions = [
    { value: 'pria', label: 'Laki-laki' },
    { value: 'wanita', label: 'Perempuan' }
];

const EditStudent = () => {
    const { uid } = useParams(); // Mengambil UID dari URL
    const navigate = useNavigate(); // Untuk navigasi
    const [studentData, setStudentData] = useState({
        name: '',
        nisn: '',
        alamat: '',
        agama: '',
        gender: '',
        kelas: '',
        // Password dibiarkan kosong karena tidak perlu diubah
    });
    const [error, setError] = useState(null);

    // Mengambil detail siswa saat halaman dimuat
    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await getStudentDetails(uid);
                if (response && response.data && response.data.payload) {
                    const data = response.data.payload;
                    // Sesuaikan field berdasarkan struktur data dari API
                    setStudentData({
                        name: data.nama || '',
                        nisn: data.nisn || '',
                        alamat: data.alamat || '',
                        agama: data.agama || '',
                        gender: data.gender || '',
                        kelas: data.kelas || ''
                    });
                } else {
                    throw new Error('No data available');
                }
            } catch (error) {
                setError("Failed to fetch student details.");
                console.error('Error fetching student details:', error);
            }
        };
        fetchStudentDetail();
    }, [uid]);

    // Mengatur nilai input saat terjadi perubahan
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentData(prevData => ({ ...prevData, [name]: value }));
    };

    // Mengirim data siswa untuk diperbarui
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Updating student with data:', studentData); // Log data yang dikirim untuk debugging
            const response = await updateStudent(uid, studentData); // Mengirim data siswa untuk update
            console.log('Update response:', response); // Log respons API untuk debugging
            navigate('/student-list'); // Redirect ke halaman daftar siswa setelah berhasil diperbarui
            alert('Data Berhasil di Update')
        } catch (error) {
            setError("Gagal Melakukan Update Data");
            console.error('Error updating student data:', error); // Log error untuk debugging
        }
    };

    // Menangani pembatalan dan kembali ke daftar siswa
    const handleCancel = () => {
        navigate('/student-list'); // Redirect ke halaman daftar siswa jika batal
    };

    return (
        <div>
            <h1>Edit Student</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nama:
                    <input
                        type="text"
                        name="name" // Pastikan nama field sesuai dengan state dan API
                        value={studentData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    NISN:
                    <input
                        type="text"
                        name="nisn"
                        value={studentData.nisn}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Alamat:
                    <input
                        type="text"
                        name="alamat"
                        value={studentData.alamat}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Agama:
                    <input
                        type="text"
                        name="agama"
                        value={studentData.agama}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Gender:
                    <select
                        name="gender"
                        value={studentData.gender} // Pastikan ini sesuai dengan value yang ada di state
                        onChange={handleChange}
                        required
                    >
                        {genderOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Kelas:
                    <input
                        type="text"
                        name="kelas"
                        value={studentData.kelas}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Update</button>
                <button id='cancel' type="button" onClick={handleCancel} className="cancel-button">
                    Batal
                </button>
            </form>
        </div>
    );
};

export default EditStudent;
