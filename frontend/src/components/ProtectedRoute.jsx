import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-muted)'
      }}>
        Loading KM/ST/CENTRAL CAMP G.M.M.S session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role_name)) {
    return (
      <div className="app-container">
        <div className="main-content">
          <Navbar />
          <div className="content-wrapper" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Access Denied</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Your current role (<strong>{user.role_name}</strong>) does not have authorization to view this section.
              </p>
              <a href="/dashboard" className="btn btn-primary">Return to Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
