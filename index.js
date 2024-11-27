const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://anirban:anirban@cluster0.qnhj0.mongodb.net/kundli?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Schema and Model
const KundliSchema = new mongoose.Schema({
  boy: {
    name: String,
    birthDate: String,
    birthTime: String,
    birthCity: String,
  },
  girl: {
    name: String,
    birthDate: String,
    birthTime: String,
    birthCity: String,
  },
  compatibilityScore: Number,
});

const Kundli = mongoose.model("Kundli", KundliSchema);

// Route to save Kundli details
app.post("/api/match", async (req, res) => {
    const { boy, girl } = req.body;
  
    // Mock compatibility calculation (random score)
    const compatibilityScore = Math.floor(Math.random() * 101);
  
    const kundli = new Kundli({ boy, girl, compatibilityScore });
    await kundli.save();
  
    res.json({ message: "Kundli matched successfully", compatibilityScore });
  });
  
  // Route to get all matched Kundlis
  app.get("/api/results", async (req, res) => {
    const results = await Kundli.find();
    res.json(results);
  });
  
  app.listen(port, () => console.log(`Server running on${port}`));