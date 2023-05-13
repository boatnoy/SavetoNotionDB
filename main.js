const express = require('express');
const { Client } = require('@notionhq/client');

const app = express();
app.use(express.json());

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Endpoint to add a movie to the database
app.post('/add-movie', async (req, res) => {
  try {
    const { imdbUrl } = req.body;
    // TODO: Fetch movie details from IMDB using the given URL

    // Add a new page to the Notion database
    await notion.pages.create({
      parent
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        // TODO: Set these properties based on the fetched movie details
        Name: { 
          title: [
            {
              text: {
                content: 'Movie Name',
              },
            },
          ],
        },
        Watched: { 
          checkbox: false,
        },
        Genres: {
          multi_select: [
            {
              name: 'Genre1',
            },
            {
              name: 'Genre2',
            },
            // Add more genres as needed
          ],
        },
        // Add more properties as needed
      },
    });

    res.status(200).send({ message: 'Movie added successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred.' });
  }
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running.');
});
