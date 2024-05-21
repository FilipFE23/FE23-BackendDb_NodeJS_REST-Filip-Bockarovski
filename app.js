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
  const dataInfo = 'students';
  const sqlStudents = 'SELECT * FROM students';
  const dbData = await db.query(sqlStudents);
  
  const sqlStudentsHeaders = 'DESCRIBE students';
  const dbDataHeaders = await db.query(sqlStudentsHeaders);
  
  res.render('table', {dbData, pageTitle, dbDataHeaders, dataInfo});
});

app.get('/students/add', async (req, res) => {
  const pageTitle = 'Students';
  const dataInfo = 'add student';
  const sqlStudents = 'SELECT * FROM students';
  const dbData = await db.query(sqlStudents);

  const sqlStudentsHeaders = 'DESCRIBE students';
  const dbDataHeaders = await db.query(sqlStudentsHeaders);

  res.render('addData', {dbData, pageTitle, dbDataHeaders, dataInfo});
});

app.post('/students/add', async (req, res) => {
  const requestData = req.body;
  const sqlAddQuery = `INSERT INTO students(fName, lName, town) VALUES('${requestData.fName}', '${requestData.lName}', '${requestData.town}')`;
  await db.query(sqlAddQuery);

  res.redirect('/students');
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
  const pageTitle = 'Courses';
  const dataInfo = 'courses';
  const sqlCourses = 'SELECT * FROM courses';
  const dbData = await db.query(sqlCourses);

  const sqlCoursesHeaders = 'DESCRIBE courses';
  const dbDataHeaders = await db.query(sqlCoursesHeaders); 

  res.render('table', {dbData, pageTitle, dbDataHeaders, dataInfo});
});

// COURSES ADD WIP
app.get('/courses/add', async (req, res) => {
  const pageTitle = 'Courses';
  const dataInfo = 'add course';
  const sqlCourses = 'SELECT * FROM courses';
  const dbData = await db.query(sqlCourses);

  const sqlCoursesHeaders = 'DESCRIBE courses';
  const dbDataHeaders = await db.query(sqlCoursesHeaders);

  res.render('addData', {dbData, pageTitle, dbDataHeaders, dataInfo});
});

app.post('/courses/add', async (req, res) => {
  const requestData = req.body;
  const sqlAddQuery = `INSERT INTO courses(name, description) VALUES('${requestData.name}', '${requestData.description}')`;
  await db.query(sqlAddQuery);
  
  res.redirect('/courses');
});

app.get('/courses/:id/students', async (req, res) => {
  const coursesId = req.params.id;
  const sqlCourseDetails = `SELECT name FROM courses WHERE id = ${coursesId}`;
  const courseDetails = await db.query(sqlCourseDetails);
  const {name} = courseDetails[0]; 
  const pageTitle = `Students taking ${name}:`;

  const sqlCourseStudents = `SELECT students.* FROM students_courses JOIN students ON students_courses.students_id = students.id WHERE students_courses.courses_id = ${coursesId}`;
  const dbData = await db.query(sqlCourseStudents);
  
  const sqlStudentsHeaders = 'DESCRIBE students';
  const dbDataHeaders = await db.query(sqlStudentsHeaders);
  
  res.render('table', {dbData, pageTitle, dbDataHeaders});
});

app.get('/students_courses', async (req, res) => {
  const pageTitle = 'Students Courses';
  const sqlStudentsCourses = 'SELECT * FROM students_courses';
  const sqlStudentsCoursesHeaders = 'DESCRIBE students_courses';
  const dbData = await db.query(sqlStudentsCourses);
  const dbDataHeaders = await db.query(sqlStudentsCoursesHeaders); 
  const dataInfo = 'PLACEHOLDER';

  res.render('table', {dbData, pageTitle, dbDataHeaders, dataInfo});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Main log: server is running on  http://localhost:${port}/`);
});