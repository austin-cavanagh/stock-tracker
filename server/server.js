const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.get('/fetch-data', (req, res) => {
  // exec() spawns a shell and runs fetch_data.py
  exec('python ./scripts/fetch_data.py', (error, stdout, stderr) => {
    // error: if child process fails to execute or returned with non-zero status code
    if (error) {
      console.error(`Exec Error: ${error}`);
      return res.status(500).send('Internal Server Error');
    }

    // standard error: error and traceback provided by python when function fails
    if (stderr) {
      console.error(`Python stderr: ${stderr}`);
      return res.status(500).send('Python Error');
    }

    // standard output: output of fetch_data.py
    // turn json into js
    res.json(JSON.parse(stdout));
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
