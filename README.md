# TwinT 💬

### Less noise. More connection.

TwinT is a real-time, two-person messaging web application built using Java and Spring Boot. It explores WebSocket communication through a simple chat experience with a minimal, dark-themed interface.

## ✨ Features

- ⚡ Real-time messaging using WebSockets and STOMP
- 👥 Designed for two participants
- 🟣 Dark-themed, responsive user interface
- 🕒 Message timestamps
- 🔔 Join and leave notifications
- 🛠️ Built with Spring Boot and vanilla JavaScript

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Backend language |
| Spring Boot | Backend framework |
| WebSocket + STOMP | Real-time communication |
| HTML5 | Interface structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Client-side interactions |
| Maven | Dependency management and build |

## 🚀 Getting Started

### Prerequisites

- Java 21 or compatible JDK
- Maven (or use the included Maven Wrapper, if available)
- A modern web browser
- Internet access for the frontend's CDN-hosted STOMP library

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/TwinT.git
   cd TwinT
   ```

2. Open the project in Eclipse or your preferred Java IDE.

3. Run `TwintApplication.java`.

4. Open [http://localhost:8080](http://localhost:8080).

5. Open a second browser tab to test messaging between two clients.

## 📂 Project Structure

```text
twint/
├── src/
│   └── main/
│       ├── java/com/twint/
│       │   ├── config/
│       │   ├── controller/
│       │   └── model/
│       └── resources/
│           └── static/
│               ├── index.html
│               ├── style.css
│               └── app.js
├── docs/
│   └── SRS_TwinT.md
├── pom.xml
└── README.md
```

## 📋 Documentation

See [`docs/SRS_TwinT.md`](docs/SRS_TwinT.md) for the Software Requirements Specification.

## 🧪 Current Status

**Version 1.0 — Initial Prototype**

The initial version focuses on local real-time messaging. Participant-limit enforcement, unexpected disconnect handling, and other edge cases require further testing.

## 🔮 Future Improvements

- Reliable session and participant management
- Persistent chat history
- User authentication
- Improved connection and error handling
- Deployment for remote users

## 📄 License

No license has been selected yet.
