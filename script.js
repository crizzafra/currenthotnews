const API_KEY = 'pKb2IdqDLYylxrmqqZQcx8Hvf4nS6fdm8E2KfA7lgzVUsPoq'; // API key for authentication
const newsContainer = document.getElementById('news-container'); // Container to display news
const searchInput = document.getElementById('search-input'); // Input field for search keywords
const searchButton = document.getElementById('search-button'); // Search button

// Function to fetch news from CurrentsAPI, using the latest news or a keyword search
async function fetchNews(keyword = '') {
  // Base API endpoint to fetch latest news (filtered by country, e.g., Philippines)
  let API_URL = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}&country=PH`;

  // If a keyword is entered, modify the URL to perform a keyword search
  if (keyword) {
    API_URL = `https://api.currentsapi.services/v1/search?apiKey=${API_KEY}&keywords=${encodeURIComponent(keyword)}`;
  }

  try {
    // Send a GET request to the API
    const response = await fetch(API_URL);
    const data = await response.json(); // Parse the response as JSON

    // If news data is available, render it. Otherwise, show a message.
    if (data.news && data.news.length > 0) {
      renderNews(data.news); // Render the news items
    } else {
      newsContainer.innerHTML = '<p>No news found.</p>'; // Show message if no news found
    }
  } catch (error) {
    console.error('Error fetching news:', error); // Log any errors
    newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>'; // Display error message
  }
}

// Function to render news items on the page
function renderNews(newsItems) {
  newsContainer.innerHTML = ''; // Clear any previous content

  // Iterate through the list of news items and create HTML for each
  newsItems.forEach(news => {
    const newsElement = document.createElement('div'); // Create a new div for each news item
    newsElement.classList.add('news-item'); // Apply styling

    // Use the provided image or a placeholder if no image is available
    const imageUrl = news.image || 'https://via.placeholder.com/800x300';

    // Populate the news element with HTML content
    newsElement.innerHTML = `
      <img src="${imageUrl}" alt="News Image" />
      <div class="news-content">
        <h2><a href="${news.url}" target="_blank">${news.title}</a></h2>
        <p>${news.description || 'No description available.'}</p>
        <small>Published on: ${new Date(news.published).toLocaleString()}</small>
      </div>
    `;

    newsContainer.appendChild(newsElement); // Add the news item to the container
  });
}

// Event listener to trigger search when the button is clicked
searchButton.addEventListener('click', () => {
  const keyword = searchInput.value.trim(); // Get the search keyword
  fetchNews(keyword); // Fetch news based on the keyword
});

// Event listener for the Enter key inside the search input field
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') { // Check if the Enter key is pressed
    const keyword = searchInput.value.trim(); // Get the search keyword
    fetchNews(keyword); // Fetch news based on the keyword
  }
});

// Fetch the latest news on page load
fetchNews();
