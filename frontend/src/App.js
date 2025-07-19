import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';


import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Entries from './pages/Entries';
import EntryForm from './pages/EntryForm';
import EntryView from './pages/EntryView';

import './styles/layout.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/entries" element={<ProtectedRoute><Entries /></ProtectedRoute>} />
            <Route path="/entries/new" element={<ProtectedRoute><EntryForm /></ProtectedRoute>} />
            <Route path="/entries/:id" element={<ProtectedRoute><EntryView /></ProtectedRoute>} />
            <Route path="/entries/:id/edit" element={<ProtectedRoute><EntryForm edit /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/entries" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}