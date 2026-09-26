import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_ACCOUNTS = {
  super_admin: {
    id: 'a0000000-0000-0000-0000-000000000001',
    username: 'superadmin',
    email: 'superadmin@gmms.edu.lk',
    full_name: 'A.M.M. Baary',
    role_name: 'super_admin',
    role_label: 'Super Admin',
  },
  admin: {
    id: 'a0000000-0000-0000-0000-000000000002',
    username: 'admin_hilwan',
    email: 'admin@gmms.edu.lk',
    full_name: 'M.H.M. Hilwan',
    role_name: 'admin',
    role_label: 'School Admin',
  },
  principal: {
    id: 'a0000000-0000-0000-0000-000000000003',
    username: 'principal_zamzam',
    email: 'principal@gmms.edu.lk',
    full_name: 'V.M. Zamzam (SLPS-1)',
    role_name: 'principal',
    role_label: 'Principal',
  },
  teacher: {
    id: 'a0000000-0000-0000-0000-000000000004',
    username: 'teacher_fathima',
    email: 'teacher@gmms.edu.lk',
    full_name: 'Mrs. K. Fathima',
    role_name: 'teacher',
    role_label: 'Teacher',
  },
  student: {
    id: 'a0000000-0000-0000-0000-000000000005',
    username: 'student_kamal',
    email: 'student@gmms.edu.lk',
    full_name: 'Kamal Hilmy',
    role_name: 'student',
    role_label: 'Student',
  },
  parent: {
    id: 'a0000000-0000-0000-0000-000000000006',
    username: 'parent_hilmy',
    email: 'parent@gmms.edu.lk',
    full_name: 'M. Hilmy',
    role_name: 'parent',
    role_label: 'Parent',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gmms_user');
    const savedToken = localStorage.getItem('gmms_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (err) {
        localStorage.removeItem('gmms_user');
        localStorage.removeItem('gmms_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem('gmms_user', JSON.stringify(data.data.user));
      localStorage.setItem('gmms_token', data.data.token);

      return { success: true, user: data.data.user };
    } catch (err) {
      // Local fallback for offline testing if backend is not started
      console.warn('Backend login call failed or offline, checking local mock demo accounts:', err.message);
      const match = Object.values(DEMO_ACCOUNTS).find(
        (acc) =>
          (acc.email.toLowerCase() === usernameOrEmail.toLowerCase() ||
           acc.username.toLowerCase() === usernameOrEmail.toLowerCase()) &&
          password === 'Password@123'
      );

      if (match) {
        const dummyToken = 'mock-jwt-token-' + match.role_name;
        setUser(match);
        setToken(dummyToken);
        localStorage.setItem('gmms_user', JSON.stringify(match));
        localStorage.setItem('gmms_token', dummyToken);
        return { success: true, user: match };
      }

      throw err;
    }
  };

  const switchRoleForDemo = (roleKey) => {
    const account = DEMO_ACCOUNTS[roleKey];
    if (account) {
      const dummyToken = 'mock-jwt-token-' + account.role_name;
      setUser(account);
      setToken(dummyToken);
      localStorage.setItem('gmms_user', JSON.stringify(account));
      localStorage.setItem('gmms_token', dummyToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gmms_user');
    localStorage.removeItem('gmms_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        switchRoleForDemo,
        DEMO_ACCOUNTS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
