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
app.get("/createbrandstable", (req, res) => {
	let sql =
		"CREATE TABLE brands(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
	db.query(sql, (err, result) => {
		if (err) throw error;
		console.log(result);
		res.send("Brands table created...");
	});
});

// Insert brand
app.get("/addbrand1", (req, res) => {
	let brand = { title: "Brand one", body: "This is brand number one" };
	let sql = "INSERT INTO posts SET ?";
	let query = db.query(sql, brand, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Brand1 created...");
	});
});

app.get("/addbrand2", (req, res) => {
	let brand = { title: "Brand two", body: "This is brand number two" };
	let sql = "INSERT INTO posts SET ?";
	let query = db.query(sql, brand, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Brand2 created...");
	});
});

//Select brands
app.get("/getbrands", (req, res) => {
	let sql = "SELECT * FROM brands";
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		console.log(results);
		res.send("Brands Fetched...");
	});
});

//Select Brand
app.get("/getbrand/:id", (req, res) => {
	let sql = `SELECT * FROM brands WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Brand Fetched...");
	});
});

// Update Brand
app.get("/updatebrand/:id", (req, res) => {
	let newTitle = "Updated Brand";
	let sql = `UPDATE brands SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Brand updated...");
	});
});

//Delete Brand
app.get("/deletebrand/:id", (req, res) => {
	let newTitle = "Updated Brand";
	let sql = `DELETE FROM brands WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("Brand deleted...");
	});
});

app.listen("3000", () => {
	console.log("Server started on port 3000");
});
