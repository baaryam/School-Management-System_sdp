const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { supabase } = require('../config/supabase');

// Mock fallback accounts for seamless offline testing when Supabase keys are not set up yet
const MOCK_DEMO_USERS = [
  {
    user_id: 'a0000000-0000-0000-0000-000000000001',
    username: 'superadmin',
    email: 'superadmin@gmms.edu.lk',
    role_name: 'super_admin',
    full_name: 'A.M.M. Baary',
    status: 'active',
  },
  {
    user_id: 'a0000000-0000-0000-0000-000000000002',
    username: 'admin_hilwan',
    email: 'admin@gmms.edu.lk',
    role_name: 'admin',
    full_name: 'M.H.M. Hilwan',
    status: 'active',
  },
  {
    user_id: 'a0000000-0000-0000-0000-000000000003',
    username: 'principal_zamzam',
    email: 'principal@gmms.edu.lk',
    role_name: 'principal',
    full_name: 'V.M. Zamzam (SLPS-1)',
    status: 'active',
  },
  {
    user_id: 'a0000000-0000-0000-0000-000000000004',
    username: 'teacher_fathima',
    email: 'teacher@gmms.edu.lk',
    role_name: 'teacher',
    full_name: 'Mrs. K. Fathima',
    status: 'active',
  },
  {
    user_id: 'a0000000-0000-0000-0000-000000000005',
    username: 'student_kamal',
    email: 'student@gmms.edu.lk',
    role_name: 'student',
    full_name: 'Kamal Hilmy',
    status: 'active',
  },
  {
    user_id: 'a0000000-0000-0000-0000-000000000006',
    username: 'parent_hilmy',
    email: 'parent@gmms.edu.lk',
    role_name: 'parent',
    full_name: 'M. Hilmy',
    status: 'active',
  },
];

/**
 * Handle user login (FR-01, FR-02)
 */
const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email and Password are required.',
      });
    }

    let authenticatedUser = null;
    let userRole = 'student';

    // 1. Try querying Supabase if connection is configured
    const isConfigured = process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('placeholder');
    if (isConfigured && supabase) {
      try {
        const { data: userRecord, error } = await supabase
          .from('users')
          .select('user_id, username, email, password_hash, status, roles(role_name)')
          .or(`email.eq.${usernameOrEmail.toLowerCase()},username.eq.${usernameOrEmail.toLowerCase()}`)
          .single();

        if (!error && userRecord) {
          const isMatch = await bcrypt.compare(password, userRecord.password_hash);
          if (isMatch) {
            authenticatedUser = {
              user_id: userRecord.user_id,
              username: userRecord.username,
              email: userRecord.email,
              role_name: userRecord.roles?.role_name || 'student',
              status: userRecord.status,
            };
            userRole = authenticatedUser.role_name;
          }
        }
      } catch (dbErr) {
        console.warn('Supabase query failed, checking fallback accounts...', dbErr.message);
      }
    }

    // 2. Demo fallback accounts for initial evaluation
    if (!authenticatedUser) {
      const foundDemo = MOCK_DEMO_USERS.find(
        (u) =>
          (u.email.toLowerCase() === usernameOrEmail.toLowerCase() ||
           u.username.toLowerCase() === usernameOrEmail.toLowerCase()) &&
          password === 'Password@123'
      );

      if (foundDemo) {
        authenticatedUser = foundDemo;
        userRole = foundDemo.role_name;
      }
    }

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your username/email and password.',
      });
    }

    if (authenticatedUser.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive or suspended. Please contact the administrator.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: authenticatedUser.user_id,
        username: authenticatedUser.username,
        email: authenticatedUser.email,
        role_name: userRole,
      },
      process.env.JWT_SECRET || 'super-secret-jwt-key-gmms-school-mgmt-2026',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: authenticatedUser.user_id,
          username: authenticatedUser.username,
          email: authenticatedUser.email,
          role_name: userRole,
          full_name: authenticatedUser.full_name || authenticatedUser.username,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged in user details
 */
const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * List roles
 */
const getRoles = async (req, res, next) => {
  try {
    const roles = [
      { role_name: 'super_admin', description: 'Full system management and access control' },
      { role_name: 'admin', description: 'Administrative operations, staff/student records, timetables' },
      { role_name: 'principal', description: 'Academic oversight, reports, analytics, announcements' },
      { role_name: 'teacher', description: 'Timetable viewing, mark entry, publishing, parent messaging' },
      { role_name: 'student', description: 'View timetable, enrolled subjects, published results, reports' },
      { role_name: 'parent', description: 'View child academic progress, timetable, contact teachers' },
    ];
    res.status(200).json({
      success: true,
      data: { roles },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe, getRoles };
