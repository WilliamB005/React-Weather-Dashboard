# React Weather Dashboard (Assignment 5)

A responsive, multi-component React application built with Vite that fetches and displays real-time weather data using the Open-Meteo API.

## Features

* **Multi-Component Architecture:** Decomposed into focused, reusable components (`SearchBar`, `WeatherCard`, `LoadingSpinner`, and `ErrorMessage`).
* **State Management:** Utilizes React's `useState` hook for managing search queries, active locations, weather data, loading status, and error states.
* **Side Effects & Data Fetching:** Implements `useEffect` with proper dependency arrays to fetch geocoding and live meteorological data asynchronously[cite: 1, 2].
* **Conditional Rendering:** Dynamically switches between loading, error, and success views depending on API response states.
* **Responsive UI:** Styled for seamless usage across desktop and mobile screen sizes[cite: 2].

## Tech Stack

* **React** (Functional components and hooks)[cite: 1]
* **Vite**[cite: 1]
* **Open-Meteo API** (Geocoding & Weather Forecast APIs)

## Project Structure

```text
src/
├── components/
│   ├── ErrorMessage.jsx
│   ├── LoadingSpinner.jsx
│   ├── SearchBar.jsx
│   └── WeatherCard.jsx
├── App.jsx
├── App.css
└── main.jsx