-- ====================================================================
-- KM/ST/CENTRAL CAMP G.M.M.S - School Management System (GMMS)
-- Initial Seed Data
-- ====================================================================

-- 1. Insert Roles
INSERT INTO roles (role_id, role_name, description) VALUES
('11111111-1111-1111-1111-111111111111', 'super_admin', 'Full system management and access control'),
('22222222-2222-2222-2222-222222222222', 'admin', 'Administrative operations, staff/student records, timetables'),
('33333333-3333-3333-3333-333333333333', 'principal', 'Academic oversight, reports, analytics, announcements'),
('44444444-4444-4444-4444-444444444444', 'teacher', 'Timetable viewing, mark entry, publishing, parent messaging'),
('55555555-5555-5555-5555-555555555555', 'student', 'View timetable, enrolled subjects, published results, reports'),
('66666666-6666-6666-6666-666666666666', 'parent', 'View child academic progress, timetable, contact teachers')
ON CONFLICT (role_name) DO NOTHING;

-- 2. Insert Users (Password hashes for demo: hashed 'Password@123')
INSERT INTO users (user_id, role_id, username, email, password_hash, status) VALUES
('a0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'superadmin', 'superadmin@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active'),
('a0000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'admin_hilwan', 'admin@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active'),
('a0000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'principal_zamzam', 'principal@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active'),
('a0000000-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'teacher_fathima', 'teacher@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active'),
('a0000000-0000-0000-0000-000000000005', '55555555-5555-5555-5555-555555555555', 'student_kamal', 'student@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active'),
('a0000000-0000-0000-0000-000000000006', '66666666-6666-6666-6666-666666666666', 'parent_hilmy', 'parent@gmms.edu.lk', '$2a$10$w3a6q5P9sF5qB08Hn8pSj.x6uS9h3gE5pX4vQ6rB8gW7jL4oP3iqa', 'active')
ON CONFLICT (email) DO NOTHING;

-- 3. Insert Classes
INSERT INTO classes (class_id, class_name, grade, academic_year) VALUES
('c0000000-0000-0000-0000-000000000001', 'Grade 10-A', 'Grade 10', '2026'),
('c0000000-0000-0000-0000-000000000002', 'Grade 10-B', 'Grade 10', '2026'),
('c0000000-0000-0000-0000-000000000003', 'Grade 11-A', 'Grade 11', '2026')
ON CONFLICT (class_name, academic_year) DO NOTHING;

-- 4. Insert Subjects
INSERT INTO subjects (subject_id, subject_name, subject_code, grade, unit) VALUES
('b0000000-0000-0000-0000-000000000001', 'Mathematics', 'MATH10', 'Grade 10', 'Core'),
('b0000000-0000-0000-0000-000000000002', 'Science', 'SCI10', 'Grade 10', 'Core'),
('b0000000-0000-0000-0000-000000000003', 'English Language', 'ENG10', 'Grade 10', 'Core'),
('b0000000-0000-0000-0000-000000000004', 'Information & Communication Tech', 'ICT10', 'Grade 10', 'Unit 1'),
('b0000000-0000-0000-0000-000000000005', 'History', 'HIST10', 'Grade 10', 'Core')
ON CONFLICT (subject_code) DO NOTHING;

-- 5. Insert Staff & Teachers
INSERT INTO staff (staff_id, user_id, full_name, staff_type, nic, contact, email, address) VALUES
('s0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'M.H.M. Hilwan', 'Non-Academic', '198012345678', '0742694116', 'admin@gmms.edu.lk', 'Central Camp, Ampara'),
('s0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'V.M. Zamzam (SLPS-1)', 'Academic', '197598765432', '0752031120', 'principal@gmms.edu.lk', 'Central Camp, Ampara'),
('s0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 'Mrs. K. Fathima', 'Academic', '198822334455', '0771234567', 'teacher@gmms.edu.lk', 'Central Camp, Ampara')
ON CONFLICT DO NOTHING;

INSERT INTO teachers (teacher_id, staff_id, qualification, contact) VALUES
('t0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000003', 'B.Sc. (Ed) Mathematics & Science, PGDE', '0771234567')
ON CONFLICT DO NOTHING;

-- 6. Insert Students
INSERT INTO students (student_id, user_id, class_id, full_name, admission_number, date_of_birth, gender, contact, address) VALUES
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'Kamal Hilmy', 'GMMS/2026/1001', '2010-05-14', 'Male', '0715566778', 'Main Street, Central Camp')
ON CONFLICT (admission_number) DO NOTHING;

-- 7. Insert Parents & Parent_Student Link
INSERT INTO parents (parent_id, user_id, full_name, contact, occupation, address) VALUES
('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'M. Hilmy', '0715566778', 'Civil Officer', 'Main Street, Central Camp')
ON CONFLICT DO NOTHING;

INSERT INTO parent_student (parent_student_id, parent_id, student_id, relationship) VALUES
('ps000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Father')
ON CONFLICT DO NOTHING;

-- 8. Assign Subject to Teacher
INSERT INTO subject_assignments (assignment_id, teacher_id, subject_id, class_id, academic_year) VALUES
('sa000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '2026')
ON CONFLICT DO NOTHING;

-- 9. Enroll Student in Subject
INSERT INTO student_subject_enrollment (enrollment_id, student_id, subject_id, class_id, academic_year) VALUES
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '2026'),
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', '2026')
ON CONFLICT DO NOTHING;

-- 10. Sample Announcement
INSERT INTO announcements (announcement_id, created_by, title, content, target_role, published_date, status) VALUES
('m0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Welcome to Academic Year 2026 - Term 1', 'Welcome to KM/ST/CENTRAL CAMP G.M.M.S new academic term. Please verify your timetables and subject allocations.', 'all', CURRENT_DATE, 'published')
ON CONFLICT DO NOTHING;
