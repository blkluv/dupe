# Dupe Finder

Find affordable alternatives to your favorite luxury products — instantly.

**Live Site:** [dupe-finder-sandy.vercel.app](https://dupe-finder-sandy.vercel.app)

## About
Dupe Finder is a full-stack web app that searches Amazon in real time to find budget-friendly alternatives to high-end products. Search any luxury item and discover dupes with real images, star ratings, and pricing — all in a clean, aesthetic interface.

## Features
- Real-time Amazon product search via RapidAPI
- Price comparison bar showing how much you save
- Best Dupe badge highlighting the top pick
- Wishlist to save your favorite finds
- Trending searches tracked in real time
- Browse by category (Hair Tools, Bags, Activewear, and more)
- Share button to copy product links
- "Did you mean?" suggestions for misspelled searches

## Tech Stack
- **Frontend:** React.js, React Router, deployed on Vercel
- **Backend:** Node.js, Express.js, deployed on Render
- **Database:** MongoDB Atlas
- **API:** RapidAPI — Axesso Amazon Data Service
- **Payments:** N/A

## Local Development

### Prerequisites
- Node.js & npm
- MongoDB Atlas account
- RapidAPI key

### Installation

1. Clone the repo
\`\`\`
git clone https://github.com/YOURUSERNAME/dupe-finder.git
\`\`\`

2. Install frontend dependencies
\`\`\`
cd client
npm install
\`\`\`

3. Install backend dependencies
\`\`\`
cd ../server
npm install
\`\`\`

4. Create a \`.env\` file in the server folder
\`\`\`
MONGO_URI=your_mongodb_connection_string
RAPIDAPI_KEY=your_rapidapi_key
\`\`\`

5. Run the backend
\`\`\`
npm run dev
\`\`\`

6. Run the frontend (in a new terminal tab)
\`\`\`
cd client
npm start
\`\`\`

## Author
Built by Stephania Calin — Frontend Developer