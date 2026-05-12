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

**Hours worked:** 5

**What I did:**  
Set up the MERN project structure with separate client and server folders. Configured the React frontend using Vite and Tailwind CSS and initialized the Express backend server. Connected the frontend and backend using a test API endpoint and verified successful communication between both services. Built the initial AI spend audit form with support for multiple tools, plans, monthly spend, seat count, and use case selection. Implemented localStorage persistence so form data remains available after page refresh and added a clear/reset functionality. Also started building the audit engine by defining pricing data structures and implementing recommendation logic for identifying potentially overpriced plans and estimating savings opportunities.

**What I learned:**  
Learned how to organize a scalable MERN application structure and manage frontend-backend communication through API requests. Also understood how localStorage can be used to persist application state across browser reloads and how business logic can be separated into reusable utility functions for maintainability.

**Blockers / what I'm stuck on:**  
Still refining the audit recommendation logic to make the savings calculations more realistic and defensible for different tools and pricing plans.

**Plan for tomorrow:**  
Improve the audit engine, build a better results dashboard with total monthly and annual savings calculations, and start working on backend storage for audit reports.

## Day 3 — 2026-05-12

**Hours worked:** 5

**What I did:**  
Improved the frontend audit experience by adding a dynamic tool-specific plan selection system based on pricing data. Refactored the audit dashboard UI with a savings hero section showing total monthly and annual savings along with conditional messaging for optimized spending and high-savings opportunities. Integrated MongoDB Atlas with the Express backend using Mongoose and created backend APIs to store generated audit reports. Connected the frontend to the backend so generated audits are automatically saved in the database and unique audit IDs are returned after successful report generation. Also fixed several frontend rendering and state management issues during integration.

**What I learned:**  
Learned how to connect a MERN frontend and backend with persistent database storage using MongoDB Atlas and Mongoose. Also improved my understanding of conditional rendering in React, reusable pricing-based UI generation, and managing asynchronous API requests between client and server.

**Blockers / what I'm stuck on:**  
Still refining the audit recommendation logic and planning the architecture for shareable public audit URLs and lead capture functionality.

**Plan for tomorrow:**  
Implement public shareable audit URLs, create backend routes for fetching saved audit reports, and start building the lead capture and email workflow.