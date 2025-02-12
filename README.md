# How to run this App

## Description

This is a React-based project that fetches and displays data from a fake API (JSONPlaceholder). It supports pagination, category-based filtering, and dynamic rendering of different types of content.

## Features

Fetches data from JSONPlaceholder

Displays posts, comments, albums, photos, todos, and users

Pagination support with Next & Previous buttons

Animated UI using AOS (Animate On Scroll)

Modularized components (Header, Footer, etc.)

Responsive design

Email & Password Login

Google Sign-In Integration

Animated Login UI (Rive Animation)
1. Interactive animations based on user actions.

Remember Me on Register page

Pagination of resources from the API

Caching for remember me logic.

Dynamic Form Validator(Register Form)
Validates multiple fields dynamically (e.g., email, password(lower, upper, symbols and numbers), phone number).
Uses a configuration object to specify rules.
Displays errors without reloading the page.

Supports:
Required fields.
Regex validation.
Minimum length validation.

#### Installation

# Prerequisites

Ensure you have the following installed:

1. Node.js

2. npm (comes with Node.js) or yarn

# Steps

1. Clone the repository:

2. git clone https://github.com/RusokeMarvin/rusokeservicecops.git

3. cd rusokeservicecops

### Install dependencies:

npm install

### Start the development server:

npm start

### Open in browser:
http://localhost:3000

# PAGES
## Register page
This handles all the validation as required
![register](https://github.com/user-attachments/assets/f5426c7e-646a-49c3-879f-68f03f2a4a43)

## Login
This one accepts signin with Google and also has an animation above it that gazes at the active field so long as it's not a password field
![login1](https://github.com/user-attachments/assets/e225d7ef-3a74-412e-b495-8a8d41241559)

This is the second state of the animation where it closes the eyes when the active field is now a password field due to confidentiallity
![login2](https://github.com/user-attachments/assets/717b89ce-621d-4cee-9dad-0af7eaae3b7d)

## Home Page
This one has multiple buttons that trigger specific states. It uses useState react hooks for management of states together with useEffect hook to handle sideEffects.
![home](https://github.com/user-attachments/assets/9375f992-9349-4bcd-986d-5f821951e590)

## Todos
This one of the edit points of the API. And it supports toggling of status of the Todo task
![status](https://github.com/user-attachments/assets/298ebed3-632e-4a6d-9e38-357f89e7c60e)




