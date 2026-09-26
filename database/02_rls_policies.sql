-- ====================================================================
-- KM/ST/CENTRAL CAMP G.M.M.S - School Management System (GMMS)
-- Row Level Security (RLS) Policies
-- Enforces Access Control matching FR-02 & Business Rules BR-01 to BR-19
-- ====================================================================

-- Enable Row Level Security on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_subject_enrollment ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE examination_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------
-- Helper Functions to identify current authenticated user and role
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS VARCHAR AS $$
    SELECT r.role_name
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.user_id = auth.uid()
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Read policies for basic catalog (Roles, Classes, Subjects)
CREATE POLICY "Public/Authenticated read roles" ON roles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read classes" ON classes
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read subjects" ON subjects
    FOR SELECT TO authenticated USING (true);

-- Admin & Principal full access to Classes and Subjects
CREATE POLICY "Admin/Principal manage classes" ON classes
    FOR ALL TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin', 'principal'));

CREATE POLICY "Admin/Principal manage subjects" ON subjects
    FOR ALL TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin', 'principal'));

-- --------------------------------------------------------------------
-- Users & Profiles
-- --------------------------------------------------------------------
CREATE POLICY "Users read own profile" ON users
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR get_current_user_role() IN ('super_admin', 'admin', 'principal'));

CREATE POLICY "Admin/SuperAdmin manage users" ON users
    FOR ALL TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin'));

-- --------------------------------------------------------------------
-- Announcements
-- --------------------------------------------------------------------
CREATE POLICY "Anyone read published announcements" ON announcements
    FOR SELECT TO authenticated
    USING (status = 'published');

CREATE POLICY "Admin/Principal/Teacher create announcements" ON announcements
    FOR INSERT TO authenticated
    WITH CHECK (get_current_user_role() IN ('super_admin', 'admin', 'principal', 'teacher'));

CREATE POLICY "Admin/Principal update announcements" ON announcements
    FOR UPDATE TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin', 'principal'));

-- --------------------------------------------------------------------
-- Examination Results & Student Reports
-- --------------------------------------------------------------------
CREATE POLICY "Teachers and Admins view all results" ON examination_results
    FOR SELECT TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin', 'principal', 'teacher'));

CREATE POLICY "Students view own published results" ON examination_results
    FOR SELECT TO authenticated
    USING (
        status = 'published' AND
        student_id IN (SELECT student_id FROM students WHERE user_id = auth.uid())
    );

CREATE POLICY "Parents view child's published results" ON examination_results
    FOR SELECT TO authenticated
    USING (
        status = 'published' AND
        student_id IN (
            SELECT ps.student_id 
            FROM parent_student ps
            JOIN parents p ON ps.parent_id = p.parent_id
            WHERE p.user_id = auth.uid()
        )
    );

-- --------------------------------------------------------------------
-- Communication (Direct Messaging)
-- --------------------------------------------------------------------
CREATE POLICY "Users view own messages" ON communication
    FOR SELECT TO authenticated
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users send messages" ON communication
    FOR INSERT TO authenticated
    WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Recipient mark as read" ON communication
    FOR UPDATE TO authenticated
    USING (receiver_id = auth.uid());

-- --------------------------------------------------------------------
-- Feedback
-- --------------------------------------------------------------------
CREATE POLICY "Users submit feedback" ON feedback
    FOR INSERT TO authenticated
    WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "Users view own feedback" ON feedback
    FOR SELECT TO authenticated
    USING (submitted_by = auth.uid() OR get_current_user_role() IN ('super_admin', 'admin', 'principal'));

CREATE POLICY "Admin/Principal review feedback" ON feedback
    FOR UPDATE TO authenticated
    USING (get_current_user_role() IN ('super_admin', 'admin', 'principal'));
