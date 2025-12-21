# Wispr Flow Clone — Voice-to-Text Desktop App

> A functional clone of Wispr Flow, focused on delivering a reliable push-to-talk voice transcription workflow.
> This project demonstrates real-time audio capture, low-latency speech recognition, and seamless text insertion into any active text field using a lightweight desktop architecture.

# Overview

> This application enables users to dictate text using voice from anywhere on their system.
> By holding a push-to-talk shortcut, users can speak naturally and have their speech transcribed and inserted directly into the currently focused text input (browser, editor, document, etc.).

> The project prioritizes functionality, correctness, and clean architecture over UI polish, in line with the assignment goals.

# Core Features

Global push-to-talk voice input

Real-time speech-to-text transcription

Interim and final transcript handling

Automatic text insertion into the focused input field

Microphone permission handling

Cross-platform desktop support using Tauri

# Tech Stack

## Desktop Framework

- Tauri (v2) — lightweight cross-platform desktop runtime

## Frontend

- React

- JavaScript

- Vite

## Speech Recognition

- Deepgram API (real-time streaming)

## How to Use Voice Transcription

> Hold the “Hold to Speak” button in the app, or press Ctrl / Cmd + Shift + Space to begin dictation.
> While speaking, keep any text field on your screen selected (browser, editor, document, etc.).
> Release the button or shortcut to stop recording.
> Your speech will be transcribed and automatically inserted into the focused text field.
> For best results, ensure microphone access is enabled.

# Usage Guide

- Keep the application running in the background.

- Select the text box where you want the transcribed text to appear.

- Press and hold Ctrl / Cmd + Shift + Space.

- Wait briefly (≈ 0.5 seconds) for the transcription service to connect.

- Speak clearly while holding the shortcut.

- Release the shortcut to stop recording.

- The final transcription is automatically inserted.

## Best Practices for Accurate Transcription

- Use a clear, loud, and noise-free voice

- Avoid background noise or overlapping speech

- Use a quality microphone if available

- Maintain consistent speech while holding the push-to-talk input

# Setup & Installation

## Prerequisites

- Ensure the following are installed:

- Node.js (v18+ recommended)

- npm or pnpm

- Rust (required by Tauri)

- Tauri CLI

Install Tauri CLI

```bash
npm install -g @tauri-apps/cli
```

---

Clone the Repository

```bash
git clone https://github.com/krishnam98/Wispr-flow-clone

cd wisper-flow-clone
```

---

Install Dependency

```bash
npm install
```

---

Environment Configuration
Create `.env` file in the field

```env
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

---

Run the App

```bash
npx run tauri dev
```

---

This starts the frontend and launches the native desktop app.

---

# Architectural Decisions, Assumptions & Limitations

## Architectural Decisions

### Separation of Concerns

- Audio capture, transcription, state management, and UI are implemented as independent modules.

- This ensures clean boundaries, easier debugging, and future extensibility.

### Push-to-Talk Workflow

- Chosen to prevent unintended recordings and unnecessary API usage.
- Gives users explicit control over when recording starts and stops.

### Real-Time Streaming with Finalization

- Audio is streamed continuously.
- Interim transcripts provide live feedback.
- Final transcripts are committed only after the stream confirms completion, preventing partial or missing output.

### Clipboard-Based Text Insertion

- Text insertion is handled via the system clipboard for reliability across applications and platforms.

---

# Author

## KRISHNAM SONI
