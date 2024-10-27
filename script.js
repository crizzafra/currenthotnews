const API_KEY = 'pKb2IdqDLYylxrmqqZQcx8Hvf4nS6fdm8E2KfA7lgzVUsPoq'; // API key for authentication
const API_URL = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;

const newsContainer = document.getElementById('news-container');

// Fetch latest news from CurrentsAPI
async function fetchNews() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.news && data.news.length > 0) {
      renderNews(data.news);
    } else {
      newsContainer.innerHTML = '<p>No news found.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
  }
}

// Render news items on the page
function renderNews(newsItems) {
  newsContainer.innerHTML = ''; // Clear loading text
  newsItems.forEach(news => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news-item');

    newsElement.innerHTML = `
      <h2><a href="${news.url}" target="_blank">${news.title}</a></h2>
      <p>${news.description}</p>
      <small>Published on: ${new Date(news.published).toLocaleString()}</small>
    `;

    newsContainer.appendChild(newsElement);
  });
}

// Fetch news on page load
fetchNews();
