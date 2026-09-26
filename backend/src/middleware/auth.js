const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');

/**
 * Verify JWT token or Supabase Auth token
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. First attempt to verify with our internal JWT Secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-jwt-key-gmms-school-mgmt-2026');
    req.user = decoded;
    return next();
  } catch (jwtErr) {
    // 2. If internal JWT fails, verify if it's a Supabase Auth session token
    if (supabase) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (user && !error) {
          req.user = {
            id: user.id,
            email: user.email,
            role_name: user.user_metadata?.role_name || 'student',
          };
          return next();
        }
      } catch (sbErr) {
        // Continue to unauthorized response
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  }
};

/**
 * Role-Based Access Control (RBAC) middleware
 * @param  {...string} allowedRoles (e.g. 'super_admin', 'admin', 'principal')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role_name) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: Role information not found.',
      });
    }

    const userRole = req.user.role_name.toLowerCase();
    const authorized = allowedRoles.map(r => r.toLowerCase()).includes(userRole);

    if (!authorized) {
      return res.status(403).json({
        success: false,
        message: `Access forbidden: Role '${req.user.role_name}' does not have sufficient permissions.`,
      });
    }

    next();
  };
};

module.exports = { authenticate, authorizeRoles };
