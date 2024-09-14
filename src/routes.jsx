// Importing necessary libraries and components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.jsx'
import StudentList from './pages/getStudentList.jsx'
import StudentDetail from './pages/getStudentDetail.jsx';
import CreateStudent from './pages/postCreateStudent.jsx';
import EditStudent from './pages/postUpdateStudentData.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/student-detail/:uid" element={<StudentDetail />} />
                <Route path="/create-student" element={<CreateStudent />} />
                <Route path="/edit-student/:uid" element={<EditStudent />} />
                
            </Routes>
        </Router>
    );
};

export default AppRoutes;