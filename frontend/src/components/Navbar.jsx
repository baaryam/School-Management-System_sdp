import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, School, ArrowRightLeft } from 'lucide-react';

export default function Navbar() {
  const { user, logout, switchRoleForDemo, DEMO_ACCOUNTS } = useAuth();

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.875rem 2rem',
      backgroundColor: 'rgba(17, 24, 39, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* School Crest / Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
        }}>
          <School size={22} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, lineHeight: 1.2, color: '#f8fafc' }}>
            KM/ST/CENTRAL CAMP G.M.M.S
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            School Management System (GMMS)
          </p>
        </div>
      </div>

      {/* User Actions & Quick Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Quick Demo Switcher for Evaluation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}>
          <ArrowRightLeft size={14} color="var(--accent)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role Switcher:</span>
          <select
            value={user?.role_name || 'admin'}
            onChange={(e) => switchRoleForDemo(e.target.value)}
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {Object.entries(DEMO_ACCOUNTS).map(([key, acc]) => (
              <option key={key} value={acc.role_name} style={{ background: '#111827', color: '#fff' }}>
                {acc.role_label} ({acc.full_name})
              </option>
            ))}
          </select>
        </div>

        {/* Current Active User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.full_name || user?.username}</div>
            <span className={`badge badge-${user?.role_name}`}>
              {user?.role_name?.replace('_', ' ')}
            </span>
          </div>

          <button
            onClick={logout}
            className="btn btn-secondary"
            title="Log out"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
