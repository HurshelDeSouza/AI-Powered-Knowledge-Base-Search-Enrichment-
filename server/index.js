const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAIAnswer } = require('./aiService');

const app = express();
const port = 5000;

// In-memory document storage
const documents = [];

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file.');
    }

    const newDocument = {
      id: documents.length + 1,
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      content: data,
    };
    documents.push(newDocument);

    res.send({
      message: 'File uploaded successfully!',
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      documentId: newDocument.id,
    });
  });
});

app.get('/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';

  if (!query) {
    return res.status(400).send('Please provide a search query.');
  }

  const results = documents.filter(doc => 
    doc.content.toLowerCase().includes(query)
  ).map(doc => ({
    id: doc.id,
    filename: doc.filename,
    originalname: doc.originalname,
    path: doc.path,
    preview: doc.content.substring(0, 200) + '...',
  }));

  res.send(results);
});

app.post('/answer', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).send('Please provide a query.');
  }

  const aiResponse = await getAIAnswer(query, documents);
  res.send(aiResponse);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
