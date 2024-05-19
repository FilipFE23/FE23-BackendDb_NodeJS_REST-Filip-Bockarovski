const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require('./db.js');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/students', async (req, res) => {
  const pageTitle = 'Students';
  const sqlStudents = 'SELECT * FROM students';
  const sqlStudentsHeaders = 'DESCRIBE students';
  const dbData = await db.query(sqlStudents);
  const dbDataHeaders = await db.query(sqlStudentsHeaders);
  
  res.render('table', {dbData, pageTitle, dbDataHeaders});
});

app.get('/students/:id/courses', async (req, res) => {
  const studentId = req.params.id;
  const sqlStudentDetails = `SELECT fName, lName FROM students WHERE id = ${studentId}`;
  const studentDetails = await db.query(sqlStudentDetails);
  const {fName, lName} = studentDetails[0]; 
  const pageTitle = `${fName} ${lName}s kurser:`;

  const sqlStudentCourses = `SELECT courses.* FROM students_courses JOIN courses ON students_courses.courses_id = courses.id WHERE students_courses.students_id = ${studentId}`;
  const dbData = await db.query(sqlStudentCourses);
  
  const sqlCoursesHeaders = 'DESCRIBE courses';
  const dbDataHeaders = await db.query(sqlCoursesHeaders);
  
  res.render('table', {dbData, pageTitle, dbDataHeaders});
});

app.get('/courses', async (req, res) => {
  console.log(req.body);
  const pageTitle = 'Courses';
  const sqlCourses = 'SELECT * FROM courses';
  const sqlCoursesHeaders = 'DESCRIBE courses';
  const dbData = await db.query(sqlCourses);
  const dbDataHeaders = await db.query(sqlCoursesHeaders); 

  res.render('table', {dbData, pageTitle, dbDataHeaders});
});

app.get('/students_courses', async (req, res) => {
  const pageTitle = 'Students Courses';
  const sqlStudentsCourses = 'SELECT * FROM students_courses';
  const sqlStudentsCoursesHeaders = 'DESCRIBE students_courses';
  const dbData = await db.query(sqlStudentsCourses);
  const dbDataHeaders = await db.query(sqlStudentsCoursesHeaders); 

  res.render('table', {dbData, pageTitle, dbDataHeaders});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Main log: server is running on  http://localhost:${port}/`);
});