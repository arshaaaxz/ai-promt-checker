
// Get HTML elements
const promptInput = document.getElementById("promptInput");
const checkBtn = document.getElementById("checkBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const scoreElement = document.getElementById("score");
const ratingElement = document.getElementById("rating");
const ratingDescription = document.getElementById("ratingDescription");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const resultsList = document.getElementById("resultsList");
const suggestionsList = document.getElementById("suggestions");
const errorMessage = document.getElementById("errorMessage");

// Five prompt components and their keywords
const components = [
    {
        name: "Role",
        icon: "👤",
        keywords: [
            "act as",
            "role",
            "you are",
            "expert",
            "developer",
            "designer",
            "teacher",
            "professional"
        ],
        suggestion: "Add a role. Example: Act as a professional web developer."
    },
    {
        name: "Task",
        icon: "🎯",
        keywords: [
            "task",
            "create",
            "build",
            "develop",
            "design",
            "write",
            "explain",
            "generate"
        ],
        suggestion: "Clearly describe the task. Example: Create a student portfolio website."
    },
    {
        name: "Context",
        icon: "📚",
        keywords: [
            "context",
            "background",
            "designed for",
            "purpose",
            "audience",
            "college students",
            "project"
        ],
        suggestion: "Provide context. Explain the background and purpose of your task."
    },
    {
        name: "Constraints",
        icon: "⚙️",
        keywords: [
            "constraints",
            "constraint",
            "only",
            "must",
            "should",
            "without",
            "do not",
            "don't",
            "avoid",
            "no external"
        ],
        suggestion: "Add constraints. Example: Use only HTML, CSS and JavaScript."
    },
    {
        name: "Output Format",
        icon: "📄",
        keywords: [
            "output format",
            "format",
            "provide",
            "return",
            "separate files",
            "bullet points",
            "table",
            "html",
            "css",
            "javascript",
            "code"
        ],
        suggestion: "Specify the output format. Example: Provide complete code in three separate files."
    }
];

// Sample prompt
const samplePrompt = `
Act as a professional frontend web developer.

Task:
Create a modern and responsive student portfolio website.

Context:
This website is designed for college students to showcase
their personal information, skills, projects and education.

Constraints:
Use only HTML, CSS and JavaScript.
Do not use external frameworks or APIs.
Make the website fully responsive.

Output Format:
Provide complete source code in three separate files:
index.html, style.css and script.js.
`;

// Check Prompt button
checkBtn.addEventListener("click", checkPrompt);

function checkPrompt() {

    const prompt = promptInput.value.trim();

    // Validate empty input
    if (prompt === "") {
        errorMessage.textContent =
            "⚠️ Please enter a prompt before checking.";

        resetResults();
        return;
    }

    errorMessage.textContent = "";

    // Convert prompt to lowercase for case-insensitive detection
    const lowerPrompt = prompt.toLowerCase();

    let score = 0;
    let detectedCount = 0;

    let resultsHTML = "";
    let suggestionsHTML = "";

    // Check all five components
    components.forEach(component => {

        const found = component.keywords.some(keyword =>
            lowerPrompt.includes(keyword.toLowerCase())
        );

        if (found) {
            score += 20;
            detectedCount++;

            resultsHTML += `
                <div class="result-item">
                    <span>${component.icon} ${component.name}</span>
                    <span class="detected">✔ Detected</span>
                </div>
            `;

        } else {

            resultsHTML += `
                <div class="result-item">
                    <span>${component.icon} ${component.name}</span>
                    <span class="missing">✖ Missing</span>
                </div>
            `;

            suggestionsHTML += `
                <li>${component.suggestion}</li>
            `;
        }

    });

    // Display results
    resultsList.innerHTML = resultsHTML;

    // Display suggestions
    if (suggestionsHTML === "") {
        suggestionsList.innerHTML =
            "<li>🎉 Excellent! Your prompt contains all five components.</li>";
    } else {
        suggestionsList.innerHTML = suggestionsHTML;
    }

    // Update score
    scoreElement.textContent = score;

    // Update progress bar
    progressBar.style.width = score + "%";
    progressText.textContent = score + "% Completed";

    // Update rating
    updateRating(score);
}

// Rating system
function updateRating(score) {

    if (score === 100) {
        ratingElement.textContent = "🌟 Excellent";
        ratingDescription.textContent =
            "Perfect! Your prompt contains all five components.";

    } else if (score === 80) {
        ratingElement.textContent = "👏 Very Good";
        ratingDescription.textContent =
            "Great work! Only one component is missing.";

    } else if (score === 60) {
        ratingElement.textContent = "👍 Good";
        ratingDescription.textContent =
            "Good effort! Improve the missing components.";

    } else if (score === 40) {
        ratingElement.textContent = "🙂 Average";
        ratingDescription.textContent =
            "Your prompt needs more details.";

    } else {
        ratingElement.textContent = "⚠️ Needs Improvement";
        ratingDescription.textContent =
            "Add more components to improve your prompt quality.";
    }

}

// Load sample prompt button
sampleBtn.addEventListener("click", function() {

    promptInput.value = samplePrompt;

    errorMessage.textContent = "";

    checkPrompt();

});

// Clear button
clearBtn.addEventListener("click", function() {

    promptInput.value = "";

    errorMessage.textContent = "";

    resetResults();

});

// Reset all analysis results
function resetResults() {

    scoreElement.textContent = "0";

    ratingElement.textContent = "Not Analyzed";

    ratingDescription.textContent =
        "Your prompt score will appear here.";

    progressBar.style.width = "0%";

    progressText.textContent = "0% Completed";

    resultsList.innerHTML = `
        <div class="result-item">
            <span>👤 Role</span>
            <span class="pending">Not Checked</span>
        </div>

        <div class="result-item">
            <span>🎯 Task</span>
            <span class="pending">Not Checked</span>
        </div>

        <div class="result-item">
            <span>📚 Context</span>
            <span class="pending">Not Checked</span>
        </div>

        <div class="result-item">
            <span>⚙️ Constraints</span>
            <span class="pending">Not Checked</span>
        </div>

        <div class="result-item">
            <span>📄 Output Format</span>
            <span class="pending">Not Checked</span>
        </div>
    `;

    suggestionsList.innerHTML =
        "<li>Enter a prompt to receive suggestions.</li>";

}
