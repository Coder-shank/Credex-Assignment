## Day 1 — 2026-05-10

**Hours worked:** 1

**What I did:**  
Created the GitHub repository and initialized the required project documentation files including DEVLOG.md and ARCHITECTURE.md. Planned the overall structure and workflow for the AI Spend Audit project.

**What I learned:**  
The assignment strongly emphasizes consistency, engineering discipline, documentation, and meaningful git history rather than just building features quickly.

**Blockers / what I'm stuck on:**  
Still setting up the initial project structure and deciding the overall stack and architecture approach.

**Plan for tomorrow:**  
Set up the MERN project structure and start building the frontend and backend foundation.


## Day 2 — 2026-05-11

**Hours worked:** 4

**What I did:**  
Set up the MERN project structure with separate client and server folders. Configured the React frontend using Vite and Tailwind CSS and initialized the Express backend server. Connected the frontend and backend using a test API endpoint and verified successful communication between both services. Built the initial AI spend audit form with support for multiple tools, plans, monthly spend, seat count, and use case selection. Implemented localStorage persistence so form data remains available after page refresh and added a clear/reset functionality.

**What I learned:**  
Learned how to organize a scalable MERN application structure and manage frontend-backend communication through API requests. Also understood how localStorage can be used to persist application state across browser reloads.

**Blockers / what I'm stuck on:**  
Still planning the best structure for audit recommendation logic and pricing rule management to keep the logic maintainable and extensible.

**Plan for tomorrow:**  
Start building the audit engine to generate recommendations, calculate savings, and provide reasoning based on selected plans, pricing, and usage patterns.