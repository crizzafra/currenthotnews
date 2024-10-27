const API_KEY = 'pKb2IdqDLYylxrmqqZQcx8Hvf4nS6fdm8E2KfA7lgzVUsPoq'; // API key for authentication
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fetch news from CurrentsAPI
async function fetchNews(keyword = '') {
  let API_URL = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;

  // If keyword is provided, modify the API URL for search
  if (keyword) {
    API_URL = `https://api.currentsapi.services/v1/search?apiKey=${API_KEY}&keywords=${encodeURIComponent(keyword)}`;
  }

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

// Render news items with images
function renderNews(newsItems) {
  newsContainer.innerHTML = ''; // Clear previous news or loading text

  newsItems.forEach(news => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news-item');

    // Check if an image URL is available; if not, use a placeholder
    const imageUrl = news.image || 'https://via.placeholder.com/150';

    newsElement.innerHTML = `
      <img src="${imageUrl}" alt="News Image" />
      <div class="news-content">
        <h2><a href="${news.url}" target="_blank">${news.title}</a></h2>
        <p>${news.description || 'No description available.'}</p>
        <small>Published on: ${new Date(news.published).toLocaleString()}</small>
      </div>
    `;

    newsContainer.appendChild(newsElement);
  });
}

// Add event listener to the search button
searchButton.addEventListener('click', () => {
  const keyword = searchInput.value.trim();
  fetchNews(keyword);
});

// Fetch latest news on page load
fetchNews();
