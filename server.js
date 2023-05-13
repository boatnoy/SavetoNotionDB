const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/add-movie', async (req, res) => {
  const imdbUrl = req.body.imdbUrl;
  const notionKey = "your_notion_api_key_here";
  const databaseId = "your_notion_database_id_here";

  // Extract movie information from IMDB URL (this would be your own function)
  const movieData = await getMovieDataFromImdb(imdbUrl);

  // Send movie data to Notion
  const response = await axios.post(
    `https://api.notion.com/v1/pages`,
    {
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: movieData.title
              }
            }
          ]
        },
        // Add other properties here
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Notion-Version': '2021-08-16'
      }
    }
  );

  if (response.status == 200) {
    res.json({ message: 'Movie successfully added to Notion database' });
  } else {
    res.json({ message: 'Error adding movie to Notion database' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
