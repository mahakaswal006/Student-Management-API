const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is Running"
    });
});
let students = [
  { id: 1, name: "Mahak", course: "B.Tech CSE" },
  { id: 2, name: "Muskan", course: "B.Tech CSE" }
];

const PORT = 3000;
app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {
  console.log(req.body);

    if (!req.body.name || !req.body.course) {
        return res.status(400).json({
            message: "Name and Course are required"
        });
    }

    const newStudent = req.body;

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (!req.body.name || !req.body.course) {
    return res.status(400).json({
        message: "Name and Course are required"
    });
}
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
