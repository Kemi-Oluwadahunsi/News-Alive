# NewsAlive

NewsAlive is a modern, responsive news aggregation web application built with React and Vite. It provides users with a seamless experience to browse, search, and filter news articles from various sources.

![NewsAlive Homepage](path/to/homepage_screenshot.png)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Navigation](#navigation)
  - [Searching and Filtering](#searching-and-filtering)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse the latest news articles from various sources
- Search articles by keyword
- Filter articles by author, source, and date
- Responsive design for optimal viewing on all devices
- Infinite scrolling for seamless article loading
- Detailed view for individual articles
- Trending topics section

![NewsAlive Features](path/to/features_screenshot.png)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/newsalive.git](https://github.com/yourusername/newsalive.git)
   ```
   
2. Navigate to the project directory:
   ```bash
   cd newsalive
   ```
   
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

## Environment Setup

NewsAlive uses environment variables to securely store sensitive information like API keys. Follow these steps to set up your environment:

1. In the root directory of the project, you'll find a file named `.env.sample`. This file serves as a template for the required environment variables.

2. Create a new file in the same directory and name it `.env`. This file will store your actual environment variables and should not be committed to version control.

3. Open the `.env` file and add your API key like this:
   ```env
   VITE_API_KEY=PASTE YOUR API KEY HERE
   ```
## It is worth knowing that without this API KEY, the application will not fetch the news.
To get your API Key:
- Visit [NewsAPI website](https://newsapi.org/)
- Sign up if you don't have an account or log in
- Your API Key will be generated immediately, it will also be set to your email
- Copy and paste your API KEY in your .env file like the example above.

### Running the Application

To start the development server:
  ```bash
  npm run dev
  ```

The application will be available at `http://localhost:5173`.

### Navigation

The main navigation is located in the header of the application. You can access different sections of the app using the following links:

- Home: Browse the latest articles and trending topics
- Articles: View all articles with advanced filtering options
- About: Learn more about NewsAlive
- Contact: A messaging form with direct message implemented using EmailJs library

  ### Screenshots from the App

<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622175/Hesrosection_gaalxc.png" alt="Project Screenshot" width="800"/>
  <figcaption>This is the landing page Hero Section.</figcaption>
</figure>

<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622181/Trending_News_jx5szj.png" alt="Project Screenshot"  width="800" />
  <figcaption>Trending topics carousel section.</figcaption>
</figure>

<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622158/Articlespage_citrdp.png" alt="Project Screenshot"  width="800"/>
  <figcaption>The Main articles page for all articles</figcaption>
</figure>

<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622136/aboutpage_vlaxqz.png" alt="Project Screenshot"  width="800"/>
  <figcaption>The about page.</figcaption>
</figure>

<figure>
    <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622153/Our_mission_hcnkqi.png" alt="Project Screenshot" width="800"/>
    <figcaption>Our Mission.</figcaption>
  </figure>


  <figure>
    <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622130/contact_vln8n8.png" alt="Project Screenshot" width="800"/>
    <figcaption>The Contact page.</figcaption>
  </figure>

### Searching and Filtering

To search for articles:

1. Use the search bar at the top of the Articles page.
2. Enter your keyword and press Enter or click the search icon.
   
<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622167/searching_homepage_pvlfsy.png" alt="Project Screenshot" width="800"/>
  <figcaption>This is an example of the search UI.</figcaption>
</figure>



To filter articles:

1. On the Articles page, locate the filter section on the left sidebar.
  <figure>
    <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622150/articleswithfilter_bis2s3.png" alt="Project Screenshot"  width="800"/>
    <figcaption>Filter sidebar.</figcaption>
  </figure>
  
2. Use the dropdowns to filter by author or source.
4. Use the date picker to filter articles by publication date.

<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727622167/multipleselect_pnkhrz.png" alt="Project Screenshot" width="800"/>
  <figcaption>filtering by multiple source select.</figcaption>
</figure>


## Project Structure
<figure>
  <img src="https://res.cloudinary.com/dee9teadk/image/upload/v1727624091/WhatsApp_Image_2024-09-29_at_23.33.13_8af72fba_mjleai.jpg" alt="Project Screenshot" width="800"/>
  <figcaption>The project structure in landscape view.</figcaption>
</figure>


## Testing

To run the test suite:

  ```bash
  npm test
  ```
This will run all tests using Vitest and React Testing Library. Here's an example of a test file:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
```

## Technologies Used

NewsAlive leverages a variety of modern web technologies to provide a robust and efficient user experience:

- **React**: A JavaScript library for building user interfaces, forming the core of our application.
- **Vite**: A build tool that offers faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces. It's used throughout the application for styling, providing a consistent design system and enabling quick iterations on the UI.
- **Redux Toolkit**: State management library for managing the application's global state.
- **React Router**: Declarative routing for React applications, enabling navigation between different components.
- **Axios**: Promise-based HTTP client for making API requests.
- **Framer Motion**: A production-ready motion library for React, used for creating smooth animations and transitions.
- **Lucide React**: A collection of simply beautiful open-source icons, used throughout the application for consistent and scalable vector graphics.
- **Sonner**: A toast component for React, used for displaying non-intrusive messages and notifications to users.
- **React Slick & Slick Carousel**: Carousel component built with React, used for creating responsive and customizable image sliders.
- **React Query**: Data-fetching and state management library for React, optimizing data synchronization between the client and server.
- **React Datepicker**: A simple and reusable datepicker component for React, used in filtering articles by date.
- **Lodash**: A modern JavaScript utility library delivering modularity, performance & extras, used for various helper functions.
- **React Intersection Observer**: A React implementation of the Intersection Observer API, used for implementing infinite scrolling and lazy loading.
- **React Virtualized Auto Sizer & React Window**: Libraries for efficiently rendering large lists and tabular data in React, improving performance for long lists of articles.
- **Redux Persist**: Library to persist and rehydrate a redux store, ensuring a consistent user experience across sessions.
- **EmailJS**: Service that helps sending emails using client-side technologies only, used for the contact form functionality.

These technologies work together to create a fast, responsive, and feature-rich news aggregation platform, providing users with a seamless browsing experience across devices.


## Contributing

We welcome contributions to NewsAlive! Please follow these steps to contribute:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Update: Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request


Please make sure to update tests as appropriate and adhere to the existing coding style.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

For more information or support, please open an issue in the GitHub repository.
