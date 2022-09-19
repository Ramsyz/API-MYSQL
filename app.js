const express = require("express");
const mysql = require("mysql");

//Create db connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "secret",
	database: "nodemysql",
});

// Connect
db.connect((err) => {
	if (err) throw err;
	console.log("Mysql Connected...");
});

const app = express();

//Create DB
app.get("/createdb", (req, res) => {
	let sql = "CREATE DATABASE nodemysql";
	db.query(sql, (err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send("databse created...");
	});
});

//create table
app.get("/createbookstable", (req, res) => {
	let sql =
		"CREATE TABLE books(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
	db.query(sql, (err, result) => {
		if (err) throw error;
		console.log(result);
		res.send("Books table created...");
	});
});

// Insert book
app.get("/addbok1", (req, res) => {
	let book = { title: "Book one", body: "This is book number one" };
	let sql = "INSERT INTO posts SET ?";
	let query = db.query(sql, book, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Book1 created...");
	});
});

app.get("/addbook2", (req, res) => {
	let book = { title: "Book two", body: "This is book number two" };
	let sql = "INSERT INTO posts SET ?";
	let query = db.query(sql, book, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Book2 created...");
	});
});

//Select books
app.get("/getbooks", (req, res) => {
	let sql = "SELECT * FROM books";
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		console.log(results);
		res.send("Books Fetched...");
	});
});

//Select Book
app.get("/getbook/:id", (req, res) => {
	let sql = `SELECT * FROM books WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Book Fetched...");
	});
});

// Update Book
app.get("/updatebook/:id", (req, res) => {
	let newTitle = "Updated Book";
	let sql = `UPDATE books SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Book updated...");
	});
});

//Delete Book
app.get("/deletebook/:id", (req, res) => {
	let sql = `DELETE FROM books WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Book deleted...");
	});
});

app.listen("3000", () => {
	console.log("Server started on port 3000");
});
