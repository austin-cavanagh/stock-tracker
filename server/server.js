const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.get('/api/fetch-data', (req, res) => {
  const ticker = req.query.query;

  exec(
    `python3 server/scripts/fetch_data.py ${ticker}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec Error: ${error}`);
        return res.status(500).send('Internal Server Error');
      }

      if (stderr) {
        console.error(`Python stderr: ${stderr}`);
        return res.status(500).send('Python Error');
      }

      res.json(JSON.parse(stdout));
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
