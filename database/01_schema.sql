-- ====================================================================
-- KM/ST/CENTRAL CAMP G.M.M.S - School Management System (GMMS)
-- Database Schema Definition (PostgreSQL / Supabase)
-- Based on Software Requirements Specification (Phase 1 Report)
-- ====================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables in reverse dependency order (Clean slate if needed)
DROP TABLE IF EXISTS communication CASCADE;
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS student_reports CASCADE;
DROP TABLE IF EXISTS examination_results CASCADE;
DROP TABLE IF EXISTS examinations CASCADE;
DROP TABLE IF EXISTS timetables CASCADE;
DROP TABLE IF EXISTS student_subject_enrollment CASCADE;
DROP TABLE IF EXISTS subject_assignments CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS parent_student CASCADE;
DROP TABLE IF EXISTS parents CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- --------------------------------------------------------------------
-- 1. ROLES
-- Supported: Super Admin, Admin, Principal, Teacher, Student, Parent
-- --------------------------------------------------------------------
CREATE TABLE roles (
    role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. USERS
-- Central system credentials and authentication record
-- --------------------------------------------------------------------
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES roles(role_id) ON DELETE RESTRICT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. STAFF
-- Academic and non-academic staff information
-- --------------------------------------------------------------------
CREATE TABLE staff (
    staff_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    staff_type VARCHAR(50) NOT NULL CHECK (staff_type IN ('Academic', 'Non-Academic')),
    nic VARCHAR(20),
    contact VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. TEACHERS
-- Extended details for academic teaching staff
-- --------------------------------------------------------------------
CREATE TABLE teachers (
    teacher_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL UNIQUE REFERENCES staff(staff_id) ON DELETE CASCADE,
    qualification VARCHAR(255),
    contact VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. CLASSES
-- Grade sections (e.g. Grade 10-A, 2026)
-- --------------------------------------------------------------------
CREATE TABLE classes (
    class_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_name VARCHAR(50) NOT NULL,
    grade VARCHAR(20) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_name, academic_year)
);

-- --------------------------------------------------------------------
-- 6. STUDENTS
-- Student profile information
-- --------------------------------------------------------------------
CREATE TABLE students (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(class_id) ON DELETE RESTRICT,
    full_name VARCHAR(255) NOT NULL,
    admission_number VARCHAR(50) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    contact VARCHAR(50),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. PARENTS
-- Parent/Guardian personal details
-- --------------------------------------------------------------------
CREATE TABLE parents (
    parent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    occupation VARCHAR(100),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. PARENT_STUDENT
-- Relationship linking parents with their children
-- --------------------------------------------------------------------
CREATE TABLE parent_student (
    parent_student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL REFERENCES parents(parent_id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL CHECK (relationship IN ('Father', 'Mother', 'Guardian')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (parent_id, student_id)
);

-- --------------------------------------------------------------------
-- 9. SUBJECTS
-- Subjects offered across grades and streams/units
-- --------------------------------------------------------------------
CREATE TABLE subjects (
    subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(50) NOT NULL UNIQUE,
    grade VARCHAR(20) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 10. SUBJECT_ASSIGNMENTS
-- Admin/Principal assigns subjects & classes to teachers
-- --------------------------------------------------------------------
CREATE TABLE subject_assignments (
    assignment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    academic_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (teacher_id, subject_id, class_id, academic_year)
);

-- --------------------------------------------------------------------
-- 11. STUDENT_SUBJECT_ENROLLMENT
-- Student enrolled in applicable subjects for their grade/unit
-- --------------------------------------------------------------------
CREATE TABLE student_subject_enrollment (
    enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    enrolled_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    academic_year VARCHAR(20) NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, subject_id, academic_year)
);

-- --------------------------------------------------------------------
-- 12. TIMETABLES
-- Conflict-free class and teacher scheduling
-- --------------------------------------------------------------------
CREATE TABLE timetables (
    timetable_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    day VARCHAR(20) NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
    period VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Business Rule: Conflict Prevention
    CONSTRAINT uq_class_period_slot UNIQUE (class_id, day, period, academic_year),
    CONSTRAINT uq_teacher_period_slot UNIQUE (teacher_id, day, period, academic_year)
);

-- --------------------------------------------------------------------
-- 13. EXAMINATIONS
-- Examination schedules per class and subject
-- --------------------------------------------------------------------
CREATE TABLE examinations (
    examination_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_name VARCHAR(100) NOT NULL,
    examination_date DATE NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(class_id) ON DELETE CASCADE,
    academic_year VARCHAR(20) NOT NULL,
    created_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 14. EXAMINATION_RESULTS
-- Marks entered by teacher, published for student/parent view
-- --------------------------------------------------------------------
CREATE TABLE examination_results (
    result_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examination_id UUID NOT NULL REFERENCES examinations(examination_id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    marks DECIMAL(5, 2) NOT NULL CHECK (marks >= 0 AND marks <= 100),
    grade VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    entered_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (examination_id, student_id)
);

-- --------------------------------------------------------------------
-- 15. STUDENT_REPORTS
-- Consolidated academic progress reports
-- --------------------------------------------------------------------
CREATE TABLE student_reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    generated_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    generated_date DATE DEFAULT CURRENT_DATE,
    academic_year VARCHAR(20) NOT NULL,
    term VARCHAR(20) NOT NULL CHECK (term IN ('Term 1', 'Term 2', 'Term 3', 'Final')),
    average_marks DECIMAL(5, 2),
    overall_grade VARCHAR(10),
    report_status VARCHAR(20) NOT NULL DEFAULT 'generated' CHECK (report_status IN ('generated', 'published', 'archived')),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, academic_year, term)
);

-- --------------------------------------------------------------------
-- 16. ANNOUNCEMENTS
-- Notices published by Admin, Principal, or Teacher
-- --------------------------------------------------------------------
CREATE TABLE announcements (
    announcement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_role VARCHAR(50) NOT NULL DEFAULT 'all' CHECK (target_role IN ('all', 'teacher', 'student', 'parent', 'staff')),
    published_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 17. FEEDBACK
-- Submitted by students & parents for school improvement
-- --------------------------------------------------------------------
CREATE TABLE feedback (
    feedback_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General' CHECK (category IN ('General', 'Academic', 'Facilities', 'Administration')),
    submission_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'resolved')),
    reviewed_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    admin_response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 18. COMMUNICATION
-- 1-to-1 direct messaging between teachers and parents
-- --------------------------------------------------------------------
CREATE TABLE communication (
    communication_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read'))
);

-- Performance Indexes
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_teachers_staff_id ON teachers(staff_id);
CREATE INDEX idx_timetables_class ON timetables(class_id, day);
CREATE INDEX idx_timetables_teacher ON timetables(teacher_id, day);
CREATE INDEX idx_exam_results_exam ON examination_results(examination_id);
CREATE INDEX idx_exam_results_student ON examination_results(student_id);
CREATE INDEX idx_enrollment_student ON student_subject_enrollment(student_id);
CREATE INDEX idx_communication_pair ON communication(sender_id, receiver_id);
