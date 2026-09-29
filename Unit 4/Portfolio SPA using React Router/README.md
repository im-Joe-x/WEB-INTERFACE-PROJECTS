# Student Report Card Management System

A React + React Router app to manage student records and auto-generate report cards.

## Features
- Full CRUD on student records (add, view, edit, delete)
- Routes: /, /add, /edit/:id, /report/:id
- Auto-calculated total, percentage, grade, and pass/fail per student
- Data persisted to localStorage via a StudentContext + useLocalStorage hook

## Run locally
```
npm install
npm run dev
```
