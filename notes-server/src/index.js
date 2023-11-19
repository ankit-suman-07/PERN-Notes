const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require('dotenv').config(); // Dotenv for loading environment variables from a .env file

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000; // Server port, defaults to 5000 if not specified in environment variables

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
})

// Retrieve details of specific email IDs
// Modify your /api/notes/:email endpoint
app.get("/api/notes/:email", async (req, res) => {
    const { email } = req.params; // Get the email from the route parameters

    try {
        // Fetch notes based on the provided email
        const notes = await prisma.note.findMany({
            where: { email: email },
        });

        res.json(notes);
    } catch (error) {
        res.status(500).send("Oops something went wrong!!!");
    }
});


app.post("/api/notes", async (req, res) => {
    const { title, content, email } = req.body;

    if (!email || !title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    }

    try {
        const note = await prisma.note.create({
            data: { title, content, email }
        })
        res.json(note).send();
    } catch (error) {
        res.status(500).send("Oops something went wrong!!!")
    }
})

app.put("/api/notes/:id", async (req, res) => {
    const { title, content, email } = req.body;
    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number.");
    }

    if (!email || !title || !content) {
        return res
            .status(400)
            .send("Title and Content fields required");
    }

    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { email, title, content }
        })
        res.json(updatedNote);
    } catch (error) {
        res.status(500).send("Oops something went wrong!!!")
    }
})

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be a valid number.");
    }


    try {
        await prisma.note.delete({
            where: { id },
        })
        res.status(204).send();
    } catch (error) {
        res
            .status(500)
            .send("Oops something went wrong!!!")
    }
})

app.listen(PORT, () => {
    console.log("Server running on PORT :", PORT);
    console.log("Here hear");
})