**BeyondChats Assignment – Article Scraper & Updater**

<!-------------------- Overview -------------------->
This project is a full-stack web application that:
> Scrapes the oldest blog articles from BeyondChats
> Stores them in MongoDB
> Displays them in a React frontend
> Allows regenerating updated content for any article using an LLM
> Supports repeatable updates (no one-time lock)
The system is intentionally simple, backend-driven, and production-structured.

**Tech Stack**

** Backend**
*Node.js,
*Express.js,
*MongoDB (Mongoose)
*Cheerio (HTML parsing)
*SERPER
*Axios
*Groq LLM API 
*dotenv

**Frontend**
*React (Vite)
*Fetch API
*Plain CSS (no UI libraries)



**Features**

<!--------------------- Phase 1 – Scraping -------------------------->

>Automatically finds the last pagination page
>Scrapes the oldest 5 articles
>Extracts:
  > Title
  > Main article content
  > Source URL

{Extraction is already done and stored in DataBase}

<!--------------------- Phase 2 – Content Update --------------------->

> Uses LLM to regenerate article content
> Updates can be triggered multiple times
> Each update overwrites the previous version
> Updated content is stored in MongoDB





<!-------------------------- Frontend ---------------------------->

**Displays:**

> Original content
> Updated content (if exists)
> References (if any)

**“Update Article” button:**

> Always enabled
> Regenerates content on every click
> Reflects latest DB state instantly



<!------------------------- Project Structure ------------------------->

**Backend**

backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── article.controller.js
│   ├── models/
│   │   └── Article.js
│   ├── routes/
│   │   └── article.routes.js
│   ├── services/
│   │   ├── scraper.service.js
│   │   ├── llm.service.js
│   │   └── search.service.js
│   ├── app.js
│   
├── .env
├── package.json
└── server.js



**Frontend**
frontend/
├── src/
│   ├── components/
│   │   └── ArticleCard.jsx
│   ├── styles/
│   │   └── app.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json




**Environment Variables**

<!-------------- Create a .env file in backend/: --------------->

PORT=8000
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
SERPER_API_KEY=your_serper_api_key



**Running the Project**
**Backend**

cd backend
npm install
npm run dev


**Server runs on:**

http://localhost:8000

**Frontend**

cd frontend
npm install
npm run dev


**Frontend runs on:**

http://localhost:5173


<!---------------- API Endpoints ---------------->

**Scrape and Save 5 Articles**

POST /articles/scrape


**Get All Articles**

GET /articles


**Regenerates Update Article Content Using LLM**

POST /articles/:id/update
