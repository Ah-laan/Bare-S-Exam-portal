# Waxbarashada DDS — Online Examination Portal

Modern React + JavaScript responsive examination portal using the supplied education logo.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite address shown in the terminal.

## Build for deployment

```bash
npm run build
```

The production files are created in `dist/`.

## Demo admin

- Username: `admin`
- Password: `admin123`

## Current demo features

- Responsive landing page
- Supplied education logo
- Examination catalogue
- Student full-name + Student ID verification
- Timed multiple-choice examinations
- Automatic score calculation
- Student submission confirmation
- Admin-only result dashboard
- Exam catalogue demo
- LocalStorage demo data

## Important for production

This version is a frontend prototype. LocalStorage is NOT secure for a real school examination system.

For production, connect it to a backend/database with:
- Admin authentication
- Student authentication/verification
- Server-side exam timer validation
- Server-side answer checking
- Database for students, exams, questions and results
- Role-based access control
- Audit logs
- Secure API
- Import questions from Word/Excel if required
- Export results to Excel
- Optional payment gateway/API

The supplied logo is stored at `public/logo.jpg`.


## Student Grade Reports

Admin Dashboard now includes **Grade Reports**:
- Select any student with submissions.
- Calculates overall average.
- Converts percentage to A+/A/B/C/D/F.
- Shows each examination score.
- Shows overall PASS/FAIL.
- Prints or saves the report as PDF through the browser print dialog.

For production, report data should be generated from the secure backend/database rather than localStorage.


## Six subject examinations

The default exam catalogue now includes:
1. English
2. Maths
3. Economics
4. Aptitude Test
5. Biology
6. Physics

Each subject has its own Grade 12 exam, duration, multiple-choice questions, automatic marking, and admin-side result reporting.
