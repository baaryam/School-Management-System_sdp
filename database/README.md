# KM/ST/CENTRAL CAMP G.M.M.S - Database Setup Guide

This directory contains the database definition for the **School Management System (GMMS)** running on **Supabase (PostgreSQL)**.

## Execution Order
To initialize your Supabase database:
1. Open your Supabase project dashboard at [supabase.com](https://app.supabase.com).
2. Navigate to the **SQL Editor**.
3. Run the files in the following order:
   - `01_schema.sql` (Creates all 18 tables, relationships, and constraints)
   - `02_rls_policies.sql` (Configures Row Level Security and access control)
   - `03_seed_data.sql` (Inserts system roles, test users for each role, sample classes, and subjects)

## Demo Credentials (from `03_seed_data.sql`)
The default password for all demo accounts is `Password@123`.

| Role | Username | Email |
|------|----------|-------|
| Super Admin | `superadmin` | `superadmin@gmms.edu.lk` |
| School Admin | `admin_hilwan` | `admin@gmms.edu.lk` |
| Principal | `principal_zamzam` | `principal@gmms.edu.lk` |
| Teacher | `teacher_fathima` | `teacher@gmms.edu.lk` |
| Student | `student_kamal` | `student@gmms.edu.lk` |
| Parent | `parent_hilmy` | `parent@gmms.edu.lk` |
