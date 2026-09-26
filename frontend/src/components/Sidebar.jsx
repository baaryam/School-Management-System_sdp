import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
  Megaphone,
  MessageSquare,
  FileText,
  BookOpen,
  UserCheck,
  Settings,
  ShieldAlert,
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role_name || 'student';

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'] },
    
    // Super Admin
    { label: 'User & Roles', path: '/users', icon: ShieldAlert, roles: ['super_admin'] },
    
    // Admin & Principal Management
    { label: 'Staff Management', path: '/staff', icon: UserCheck, roles: ['super_admin', 'admin'] },
    { label: 'Teacher Management', path: '/teachers', icon: Users, roles: ['super_admin', 'admin', 'principal'] },
    { label: 'Student Management', path: '/students', icon: GraduationCap, roles: ['super_admin', 'admin', 'principal'] },
    { label: 'Subject Enrollment', path: '/enrollment', icon: BookOpen, roles: ['super_admin', 'admin'] },
    
    // Timetables
    { label: 'Timetable', path: '/timetable', icon: Calendar, roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'] },
    
    // Examinations & Results
    { label: 'Examinations & Marks', path: '/examinations', icon: FileSpreadsheet, roles: ['super_admin', 'admin', 'principal', 'teacher'] },
    { label: 'My Exam Results', path: '/my-results', icon: FileSpreadsheet, roles: ['student', 'parent'] },
    
    // Reports
    { label: 'Academic Reports', path: '/reports', icon: FileText, roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'] },
    
    // Announcements
    { label: 'Announcements', path: '/announcements', icon: Megaphone, roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'] },
    
    // Communication & Feedback
    { label: 'Parent Messages', path: '/communication', icon: MessageSquare, roles: ['teacher', 'parent'] },
    { label: 'Feedback & Suggestions', path: '/feedback', icon: MessageSquare, roles: ['super_admin', 'admin', 'principal', 'student', 'parent'] },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem 0.85rem',
      gap: '0.35rem',
    }}>
      <div style={{ padding: '0.5rem 0.75rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', fontWeight: 700 }}>
          Navigation ({role.replace('_', ' ')})
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              })}
            >
              <Icon size={18} color="var(--accent)" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
