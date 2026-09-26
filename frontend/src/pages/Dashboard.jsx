import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
  Megaphone,
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role_name || 'student';

  const renderStats = () => {
    switch (role) {
      case 'super_admin':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Registered Users</span>
                <Users size={20} color="var(--role-superadmin)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>6</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>Across 6 distinct roles</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Database Status</span>
                <ShieldCheck size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--success)' }}>Supabase</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>PostgreSQL + RLS enabled</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>RBAC Policy Status</span>
                <CheckCircle2 size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>18 Tables</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>All Phase 1 ERD entities</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Audit Logs</span>
                <Clock size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Active</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>NFR-10 Audit compliance</div>
            </div>
          </>
        );

      case 'admin':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Total Students</span>
                <GraduationCap size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>450+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Grades 6 through 11</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Teaching Staff</span>
                <Users size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>28</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Subject assigned</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Non-Academic Staff</span>
                <Users size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>6</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Administration & Ops</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Active Timetables</span>
                <Calendar size={20} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Conflict-Free</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>Checked by BR-06</div>
            </div>
          </>
        );

      case 'principal':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>School Status</span>
                <CheckCircle2 size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Operational</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Academic Year 2026</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Average Pass Rate</span>
                <TrendingUp size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>84.2%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>+5.1% compared to last term</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Exams Conducted</span>
                <FileSpreadsheet size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>12</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Term 1 Mid-Terms</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Pending Feedback</span>
                <Clock size={20} color="var(--role-principal)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>3 New</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Awaiting review</div>
            </div>
          </>
        );

      case 'teacher':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>My Assigned Subjects</span>
                <BookOpen size={20} color="var(--role-teacher)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>2</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Mathematics, Science</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Classes Taught</span>
                <Users size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Grade 10-A, 10-B</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Total 78 students</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Today's Periods</span>
                <Calendar size={20} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>4 Periods</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Next: Period 2 (09:00 AM)</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Parent Queries</span>
                <Megaphone size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>1 Unread</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.25rem' }}>From Mr. M. Hilmy</div>
            </div>
          </>
        );

      case 'student':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>My Class</span>
                <GraduationCap size={20} color="var(--role-student)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Grade 10-A</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Academic Year 2026</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Enrolled Subjects</span>
                <BookOpen size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>2 Active</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Mathematics, Science</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Published Results</span>
                <FileSpreadsheet size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Available</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>Term 1 Mid-Term test</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Today's Schedule</span>
                <Calendar size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>5 Periods</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Monday schedule</div>
            </div>
          </>
        );

      case 'parent':
        return (
          <>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Linked Child</span>
                <Users size={20} color="var(--role-parent)" />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Kamal Hilmy</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Grade 10-A (Admission: GMMS/2026/1001)</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Child's Subjects</span>
                <BookOpen size={20} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>2 Enrolled</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>FR-20 Subject allocation</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Latest Academic Result</span>
                <FileSpreadsheet size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>78% (A)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Mathematics - Term 1</div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Teacher Communication</span>
                <Megaphone size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>Direct Line</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Connected with Mrs. K. Fathima</div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(14, 165, 233, 0.15))',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <span className={`badge badge-${role}`} style={{ marginBottom: '0.65rem' }}>
            Active Role: {role.replace('_', ' ')}
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.4rem' }}>
            Welcome, {user?.full_name || user?.username}!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            KM/ST/CENTRAL CAMP G.M.M.S &bull; Academic Year 2026 &bull; Term 1 Operational Cycle
          </p>
        </div>
      </div>

      {/* Role Metrics Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        {renderStats()}
      </div>

      {/* Announcements & System Information */}
      <div className="grid-cols-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Megaphone size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>School Announcements</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Welcome to Academic Year 2026 - Term 1</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Published</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
                Welcome to KM/ST/CENTRAL CAMP G.M.M.S new academic term. Please verify your timetables and subject allocations.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Current Module Roadmap</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--success)' }}>
              <CheckCircle2 size={16} />
              <span><strong>Step 1 (Current):</strong> Foundation, Supabase Schemas & Auth RBAC</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--text-dim)' }} />
              <span><strong>Step 2 (Next):</strong> Staff & Teacher Management + Subject Assignment</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--text-dim)' }} />
              <span><strong>Step 3:</strong> Student Management & Subject Enrollment</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--text-dim)' }} />
              <span><strong>Step 4:</strong> Timetable Management with Conflict Detection</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
