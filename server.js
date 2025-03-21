require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Mock user authentication (Replace with a database in production)
const users = [{ email: "user@example.com", password: "password123" }];

// Handle Login Request
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful", user: { email } });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Serve Home/Login Page on Root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Secure Dashboard Access
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Secure Advanced Search Access
app.get('/advanced-search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'advanced-search.html'));
});

// 🔥 FIXED: Gemini API Integration
app.post('/api/search', async (req, res) => {
    const { query } = req.body;

    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
            {
                prompt: { text: query },
                maxTokens: 100
            }
        );

        // 🔥 FIX: Correct Response Extraction
        const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No results found.";

        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from Gemini API', details: error.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
