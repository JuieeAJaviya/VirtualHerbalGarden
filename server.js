import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const imageModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Route to serve the advanced search page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Default route to redirect to advanced search
app.get("/", (req, res) => {
    res.redirect('/dashboard');
});

// API Endpoint to fetch herbs
app.post("/api/search", async (req, res) => {
    const { category, part, country, purpose, sunExposure } = req.body;

    if (!category || !part || !country || !purpose || !sunExposure) {
        return res.status(400).json({ 
            success: false, 
            error: "All fields are required!" 
        });
    }

    const prompt = `As a knowledgeable herbalist, provide detailed information about medicinal herbs that meet the following criteria:
- Traditional System: ${category}
- Origin/Region: ${country}
- Plant Part Used: ${part}
- Therapeutic Purpose: ${purpose}
- Sun Exposure: ${sunExposure}

For each herb, please provide:
1. Common Name :
2. Scientific Name : (in italics)
3. Growing Condition : (in detail)
4. Brief Description : (2-3 sentences about appearance and characteristics)
5. Traditional Uses : (specifically for ${purpose})
6. Preparation Method :
7. Safety Considerations :
Please format the response in a clear, organized manner with proper spacing between sections.
Limit the response to 1 most relevant herbs.information look same as prompt.
don't use any other special characters. space of one line between two section`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        if (!responseText || responseText.trim() === '') {
            throw new Error('Empty response from API');
        }

        // Extract herb name from response
        const herbName = responseText.match(/Common Name\s*:\s*([^\n]+)/)?.[1] || '';

        // Generate image prompt
        const imagePrompt = `Generate a realistic, detailed image of the medicinal herb ${herbName} in its natural habitat, showing its distinctive features and characteristics.`;

        // Get image generation result
        const imageResult = await imageModel.generateContent(imagePrompt);
        const imageUrl = imageResult.response?.text() || '';

        res.json({ 
            success: true, 
            data: responseText,
            imageUrl: imageUrl
        });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Failed to fetch data from the AI model. Please try again." 
        });
    }
});

app.get("/api/models", async (req, res) => {
    try {
        const models = await genAI.listModels();
        res.json(models);
    } catch (error) {
        console.error("Error fetching models:", error);
        res.status(500).json({ error: "Failed to fetch models." });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: "Something broke on the server! Please try again later." 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
