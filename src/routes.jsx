// Importing necessary libraries and components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx'
import StudentList from './pages/getStudentList.jsx'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/student-detail" element={<StudentDetail />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;