import React, {useState, useEffect} from 'react';
import {getStudentList} from "../services/api.js";

const StudentList = () => {
    const [studentData, setStudentData] = useState([]);

    const getStudentListData = async () => {
        await getStudentList().then((response)=>{
            setStudentData(response.data.payload);
            console.log("response getStudentList data", response)
        })
    }

    useEffect( ()=>{
        getStudentListData();
        console.log("studentData", studentData)
    },[])

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                <p>{JSON.stringify(studentData)}</p>
                {studentData.map((student, index) => (
                    <li key={index}>
                        <strong>Nomor:</strong> {student.no}<br/>
                        <strong>Nama:</strong> {student.nama}<br/>
                        <strong>NISN:</strong> {student.nisn}<br/>
                        <strong>Kelas:</strong> {student.kelas}<br/>
                        <strong>Dibuat Pada:</strong> {student.createdAt}<br/>
                        <strong>Diperbaharui Pada:</strong> {student.updatedAt}<br/><br/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;