// Import necessary modules and packages
const express = require("express"); // Web framework for building the server
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
const { PrismaClient } = require("@prisma/client"); // Prisma client for database interaction
require('dotenv').config(); // Dotenv for loading environment variables from a .env file

// Initialize the Express application and Prisma client
const app = express();
const prisma = new PrismaClient();

// Define the port for the server, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON in the request body and enable CORS
app.use(express.json());
app.use(cors());

// GET endpoint to retrieve all notes from the database
app.get("/api/notes", async (req, res) => {
    try {
    // Fetch all notes from the database using Prisma
        const notes = await prisma.note.findMany();
        // Respond with the fetched notes in JSON format
        res.json(notes);
    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).send("Oops something went wrong!!!");
    }
});

// GET endpoint to retrieve notes for a specific email
app.get("/api/notes/:email", async (req, res) => {
    // Extract the email from the route parameters
    const { email } = req.params;

    try {
        // Fetch notes based on the provided email using Prisma
        const notes = await prisma.note.findMany({
            where: { email: email },
        });
        // Respond with the fetched notes in JSON format
        res.json(notes);
    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).send("Oops something went wrong!!!");
    }
});

// POST endpoint to create a new note in the database
app.post("/api/notes", async (req, res) => {
    // Extract title, content, and email from the request body
    const { title, content, email } = req.body;

    // Check if required fields are present
    if (!email || !title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    }

    try {
        // Create a new note in the database using Prisma
        const note = await prisma.note.create({
            data: { title, content, email }
        });
        // Respond with the created note in JSON format
        res.json(note);
    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).send("Oops something went wrong!!!");
    }
});

// PUT endpoint to update a note in the database by ID
app.put("/api/notes/:id", async (req, res) => {
    // Extract title, content, email, and ID from the request body and parameters
    const { title, content, email } = req.body;
    const id = parseInt(req.params.id);

    // Check if ID is a valid number
    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number.");
    }

    // Check if required fields are present
    if (!email || !title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    }

    try {
        // Update the note in the database using Prisma
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { email, title, content }
        });
        // Respond with the updated note in JSON format
        res.json(updatedNote);
    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).send("Oops something went wrong!!!");
    }
});

// DELETE endpoint to delete a note from the database by ID
app.delete("/api/notes/:id", async (req, res) => {
    // Extract ID from the route parameters
    const id = parseInt(req.params.id);

    // Check if ID is a valid number
    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number.");
    }

    try {
        // Delete the note from the database using Prisma
        await prisma.note.delete({
            where: { id },
        });
        // Respond with a 204 status code indicating successful deletion
        res.status(204).send();
    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).send("Oops something went wrong!!!");
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
    console.log("Here hear");
});
