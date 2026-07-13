# Productivity Dashboard

A modern, highly interactive productivity dashboard built with HTML, Tailwind CSS, and Vanilla JavaScript. Designed to keep you focused and organized with a suite of essential productivity tools, all wrapped in a dynamic and aesthetically pleasing UI.

## Features

- **Dynamic Weather & Time Widget:**
  - Real-time clock and date display.
  - Live weather updates (temperature, condition, precipitation, humidity, wind) powered by the Open-Meteo API.
  - Dynamic background imagery that changes based on the current weather condition and time of day.
- **To Do List:**
  - Add, edit, and delete tasks.
  - Filter by All, Active, and Completed tasks.
  - Data persists locally using `localStorage`.
- **Daily Planner:**
  - Time-blocking hourly schedule to plan your day effectively.
  - Easily log activities for each hour.
- **Pomodoro Timer:**
  - Built-in timer with presets for Work Session (25 min), Short Break (5 min), and Long Break (15 min).
  - Tracks your total focus time locally.
- **Daily Goals:**
  - Track your high-level daily goals.
  - Visual progress ring updates as you check off goals.
- **Motivation:**
  - Random motivational quotes to keep you inspired.
- **Dark Mode:**
  - Built-in light and dark modes with a smooth transition toggle.

## Tech Stack

- **HTML5:** Semantic and accessible structure.
- **Tailwind CSS:** For fast, responsive, and beautiful styling directly in the markup.
- **Vanilla JavaScript:** For DOM manipulation, local storage handling, and API integration.

## Setup & Installation

1. **Clone or Download the Repository:**
   Download the project files to your local machine.

2. **Open the Project:**
   Simply open the `index.html` file in your preferred web browser. No build process or local server is required for basic functionality!

   *Note: For the geolocation and weather fetching to work optimally without browser security restrictions, you might want to serve the directory using a simple local server (e.g., VS Code Live Server or python's `http.server`).*

## API Usage

- **Weather:** Uses the [Open-Meteo API](https://open-meteo.com/) for location-based weather data. It attempts to use your browser's Geolocation API to fetch local weather. If unavailable, it falls back to a default coordinate.
- **Quotes:** Uses the [DummyJSON API](https://dummyjson.com/) to fetch random motivational quotes.

## License

This project is open-source and available for personal or educational use.
