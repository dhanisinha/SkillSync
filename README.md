SkillSync

A developer platform and mentorship ecosystem that connects programmers, facilitates skill verification, hosts corporate tech hubs, and enables collaborative open-source project building.

📋 Table of Contents
Overview
Architecture
Features
Tech Stack
Project Structure
Getting Started
Running the Web Application
Running the Java Core Engine
Roadmap
Contributing
Overview

In today's fast-paced tech landscape, developers often struggle to find verified mentors, engage in targeted company discussions, and collaborate on real-world projects with clear task breakdown. SkillSync bridges this gap with an end-to-end platform featuring:

🧑‍🏫 Verified Industry Mentorship — smart matching of developers based on verified skills and proficiency levels
🏢 Corporate Tech Clubs — hubs dedicated to top tech companies with interview logs and community forums
🗂️ Collaborative Project Workspaces — task Kanban boards, team rosters, and shared project resources
⚙️ Dual-Engine Architecture — a modular Java CLI core engine paired with a modern React + Vite SPA
Architecture

SkillSync is structured into two core tiers:

Java Core Backend Engine — standard Java object-oriented design managing domain entities, validation routines, services, and CLI UI controllers.
SkillSync Web Application — a responsive SPA built with React, Vite, and Lucide React icons, featuring state persistence via localStorage and a dark theme.
Backend Tier (Java Core Engine)
CLI Menu Interface
Service Layer (UserService,ProjectService, ClubService,SearchService)
Domain Models (User, Skill,Project, Task, Club)
Utilities (Validator,IDGenerator, Database)
Frontend Tier (SkillSync-Web)
React 18 + Vite SPA
Modular UI Components(Navbar, Sidebar, Cards)
Pages (Home, Dashboard,Clubs, Projects, Search,Profile)
State Manager &LocalStorage Persistence
Features
👤 User & Mentor Management
Skill Profiles — developers list programming skills with proficiency levels (Beginner, Intermediate, Advanced, Expert)
Mentor Verification — toggleable mentor flag allowing experienced developers to accept mentees
Graph Connections — scalable structure to manage user follow networks and mentor-mentee relationships
🏢 Corporate Tech Clubs

Dedicated hubs for leading tech companies:

Google Developer Hub — Distributed Systems & Cloud Architecture
Meta Frontend & AR Hub — React Engine, Next-gen Web UI, WebXR
Amazon Cloud & Infra Club — AWS Infrastructure, Microservices, Scale
Microsoft AI & Dev Hub — Machine Learning, Azure Ecosystem, C#/.NET

Each hub includes discussion posts, upvoting, and verified interview experience reports.

🗂️ Collaborative Project Discovery & Kanban
Project Discovery — filter projects by required skills, team size, and difficulty level
Task Boards — Kanban-style tracking (To Do, In Progress, Completed) with assignee tagging
Resource Management — link key documentation, repository URLs, and developer guides to specific projects
🔍 Multi-Criteria Search & Filtering
Instant, multi-parameter search across verified mentors, projects, and corporate tech clubs
Skill chip selection with real-time dynamic filtering
Tech Stack
Layer	Technology / Tools
Frontend Framework	React 18, Vite 5
UI Components & Icons	Lucide React Icons, Modular Vanilla CSS
Backend Core	Java 17 (Object-Oriented Design)
Data Models	Encapsulated POJOs (User, Project, Club, Task, Skill)
State & Storage	LocalStorage API (Web), In-memory Mock Database (Java)
Build & Tooling	npm / Vite, IntelliJ IDEA
Project Structure
SkillSync/
├── .gitignore
├── PROJECT_REPORT.md
├── src/                          # Root Java Package
│   └── skillsync/
│       ├── Main.java
│       ├── graph/
│       ├── model/
│       ├── service/
│       ├── ui/
│       └── util/
└── SkillSync/                    # Project Source Bundle
    ├── SkillSync-Web/            # React + Vite Frontend
    │   ├── index.html
    │   ├── package.json
    │   ├── vite.config.js
    │   └── src/
    │       ├── components/       # Reusable UI Elements
    │       ├── pages/            # View Pages (Home, Clubs, Projects, etc.)
    │       ├── styles/           # Modular CSS Stylesheets
    │       └── data/             # Mock Data Sets
    └── src/                      # Java Source Classes
        └── skillsync/
            ├── model/            # Entity Data POJOs
            ├── service/          # Business Logic Services
            ├── ui/               # Command-Line Interfaces
            └── util/             # Helper Utilities
Getting Started
Running the Web Application
bash
# Navigate to the Web frontend directory
cd SkillSync/SkillSync-Web

# Install npm dependencies
npm install

# Start local development server
npm run dev

Access the application at http://localhost:3000/.

Running the Java Core Engine
bash
# Navigate to Java source folder
cd SkillSync/src

# Compile Java files
javac skillsync/Main.java

# Run main application
java skillsync.Main
Roadmap
 RESTful API Backend Integration — connect the React frontend to a Spring Boot / Node.js backend
 Real-Time Chat — WebSockets integration for direct mentor-mentee messaging
 Automated Skill Testing — interactive coding assessments to automatically verify developer skills
 OAuth 2.0 Authentication — sign-in with GitHub and LinkedIn integration
Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or open a pull request.

License

This project is currently unlicensed. 
