# TwinT — Software Requirements Specification

**Version:** 1.0  
**Status:** Initial Prototype  
**Technology:** Java 21, Spring Boot, WebSocket/STOMP, HTML, CSS, JavaScript

## 1. Introduction

### 1.1 Purpose
TwinT is a lightweight real-time messaging web application designed for a conversation between two participants. This document defines the requirements, scope, architecture, and initial testing criteria for version 1.0.

### 1.2 Scope
The application provides a browser-based chat interface backed by a Spring Boot server. Users can choose a username, connect to the chat, and exchange text messages in real time.

### 1.3 Objectives
- Build a functional real-time messaging prototype.
- Explore WebSocket communication using Spring Boot and STOMP.
- Provide a simple, responsive, dark-themed interface.
- Maintain a clear foundation for future improvements.

## 2. Overall Description

### 2.1 Product Perspective
TwinT is a standalone web application consisting of a frontend and a Spring Boot backend. The frontend communicates with the backend using WebSocket/STOMP.

### 2.2 User Characteristics
Users need a modern web browser and basic familiarity with sending messages in a chat interface.

### 2.3 Operating Environment
- Java 21
- Spring Boot
- Maven
- Modern web browser
- Local server environment for the initial prototype

## 3. Functional Requirements

**FR-01: Username Entry**  
The application shall allow a user to enter a username before joining the conversation.

**FR-02: Real-Time Messaging**  
The application shall transmit text messages through WebSocket/STOMP.

**FR-03: Message Display**  
The interface shall display the sender, message content, and timestamp.

**FR-04: Participant Notifications**  
The application shall support join and leave notifications.

**FR-05: Participant Limit**  
The prototype shall attempt to limit the conversation to two participants. Reliable enforcement and cleanup must be validated through testing.

**FR-06: Input Validation**  
The application shall reject empty usernames, empty messages, and inputs exceeding configured length limits.

**FR-07: Connection Feedback**  
The interface shall communicate connection status to the user.

## 4. Non-Functional Requirements

**NFR-01: Performance**  
Messages should appear with minimal delay under normal local testing conditions.

**NFR-02: Usability**  
The interface should be straightforward and easy to navigate.

**NFR-03: Responsiveness**  
The interface should adapt to desktop and mobile screen sizes.

**NFR-04: Maintainability**  
The application shall separate configuration, message models, controller logic, and frontend assets.

**NFR-05: Security**  
User-provided content should be rendered safely. Production deployment would require stronger identity validation, origin restrictions, transport security, and abuse prevention.

**NFR-06: Reliability**  
Connection failures and participant departures should be handled gracefully. These behaviours require further validation in the initial prototype.

## 5. System Architecture

### 5.1 Frontend
HTML structures the interface, CSS provides styling, and JavaScript manages user interactions and STOMP communication.

### 5.2 Backend
Spring Boot hosts the application and serves static frontend assets. The WebSocket configuration enables STOMP communication.

### 5.3 Messaging
The client sends messages to application destinations, and the backend broadcasts responses through topic destinations.

### 5.4 Data Storage
Version 1.0 does not require a persistent database. Messages and participant state are not guaranteed to survive server restarts.

## 6. Technology Stack

| Component | Technology |
|---|---|
| Language | Java 21 |
| Backend | Spring Boot |
| Build tool | Maven |
| Communication | WebSocket with STOMP |
| Frontend | HTML, CSS, JavaScript |
| Messaging broker | Spring simple broker |
| Database | Not included in v1.0 |

## 7. Initial Test Plan

- **TC-01:** Verify the application starts successfully.
- **TC-02:** Verify the login interface loads.
- **TC-03:** Verify a valid username can attempt to join.
- **TC-04:** Verify two browser clients can connect.
- **TC-05:** Verify messages can be exchanged between clients.
- **TC-06:** Verify empty messages are rejected.
- **TC-07:** Verify overly long inputs are rejected.
- **TC-08:** Verify join and leave notifications.
- **TC-09:** Verify the intended two-participant limit.
- **TC-10:** Verify behaviour when a client disconnects unexpectedly.

Test results must be recorded after execution; passing status is not assumed.

## 8. Scope Exclusions

Version 1.0 does not promise:
- User accounts or authentication
- Persistent message history
- End-to-end encryption
- Group conversations
- Image or file sharing
- Audio or video calls
- Public internet deployment

## 9. Future Enhancements

Potential future improvements include reliable session management, improved disconnect handling, persistent storage, authentication, message history, and deployment.

## 10. Version History

| Version | Description |
|---|---|
| 1.0 | Initial real-time chat prototype and requirements baseline |
