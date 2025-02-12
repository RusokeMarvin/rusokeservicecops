# How to run this App

## Description

This is a React-based project that fetches and displays data from a fake API (JSONPlaceholder). It supports pagination, category-based filtering, and dynamic rendering of different types of content.

## Features
1. Fetches data from JSONPlaceholder
2. Displays posts, comments, albums, photos, todos, and users
3. Pagination support with Next & Previous buttons
4. Animated UI using AOS (Animate On Scroll)
5. Modularized components (Header, Footer, etc.)
6. Responsive design
7. Email & Password Login
8. Google Sign-In Integration
9. Animated Login UI (Rive Animation)
1. Interactive animations based on user actions.
10. Remember Me on Register page
11. Pagination of resources from the API
12. Caching for remember me logic.
13. Dynamic Form Validator(Register Form)
1. Validates multiple fields dynamically (e.g., email, password(lower, upper, symbols and numbers), phone number).
2. Uses a configuration object to specify rules.
3. Displays errors without reloading the page.
4. Supports:
1. Required fields.
2. Regex validation.
3. Minimum length validation.

#### Installation

# Prerequisites

Ensure you have the following installed:

1. Node.js

2. npm (comes with Node.js) or yarn

# Steps

### Clone the repository:

1. git clone https://github.com/RusokeMarvin/rusokeservicecops.git

2. cd rusokeservicecops

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

It displays validation errors without reloading the page
![register2](https://github.com/user-attachments/assets/dd068082-2715-4877-b033-684e6e294ef5)


## Login
This one accepts signin with Google and also has an animation above it that gazes at the active field so long as it's not a password field
![login1](https://github.com/user-attachments/assets/e225d7ef-3a74-412e-b495-8a8d41241559)

This is the second state of the animation where it closes the eyes when the active field is now a password field due to confidentiallity
![login2](https://github.com/user-attachments/assets/717b89ce-621d-4cee-9dad-0af7eaae3b7d)

## Home Page
This one has multiple buttons that trigger specific states. It uses useState react hooks for management of states together with useEffect hook to handle sideEffects. And it supports all CRUD operations
![home](https://github.com/user-attachments/assets/9375f992-9349-4bcd-986d-5f821951e590)

## Todos
This is one of the end points of the API. And it supports toggling of status of the Todo task
![status](https://github.com/user-attachments/assets/298ebed3-632e-4a6d-9e38-357f89e7c60e)

# NB:
I encountered a challenge while trying to fetch data from the API you provided. Specifically, I 
was unable to retrieve the images from the API endpoint of /photos, even when I tested the image URLs individually in 
the browser, they still did not load. As a result, the image links failed to work when 
integrated into my implementation.
Despite this issue, I have made significant progress on the rest of the task and have successfully 
implemented the other features.

Thanks and Regards,

Rusoke Marvin




