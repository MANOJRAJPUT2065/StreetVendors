import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Insights from './pages/Insights';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="px-4 py-6 text-slate-200">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="app min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses/new"
            element={
              <PrivateRoute>
                <AddExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <Insights />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
