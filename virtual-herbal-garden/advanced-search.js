async function searchHerbs() {
    const category = document.getElementById('category').value;
    const part = document.getElementById('part').value;
    const country = document.getElementById('country').value;
    const purpose = document.getElementById('purpose').value;
    const errorMessage = document.getElementById('errorMessage');
    const loading = document.getElementById('loading');
    const generateAgainBtn = document.getElementById('generateAgainBtn');

    // Validate all fields are filled
    if (!category || !part || !country || !purpose) {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    loading.style.display = 'block';
    document.getElementById('outputBox').innerHTML = "";

    try {
        const response = await fetch("http://localhost:5000/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, part, country, purpose })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('outputBox').innerHTML = formatHerbs(data.data);
            generateAgainBtn.style.display = 'block';
        } else {
            document.getElementById('outputBox').innerHTML = "No results found. Please try different search criteria.";
        }
    } catch (error) {
        document.getElementById('outputBox').innerHTML = "Error connecting to the server. Please try again later.";
        console.error("API Error:", error);
    } finally {
        loading.style.display = 'none';
    }
}

function formatHerbs(text) {
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #4CAF50;">$1</a>');
    return `<div class="formatted-output">${text}</div>`;
}

function generateAgain() {
    searchHerbs();
}
