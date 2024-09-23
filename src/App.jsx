// src/App.jsx
import './App.css';
import AppRoutes from './routes.jsx';
import { Provider } from 'react-redux';
// import store from './store/store'; // Pastikan path ini sesuai
import store from './redux/store/store.js';

function App() {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
}

export default App;
