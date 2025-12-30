const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/itemdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schema & Model
const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemSchema);

// Seed data (runs once if DB is empty)
Item.countDocuments().then(count => {
  if (count === 0) {
    Item.insertMany([
      { name: 'Item One' },
      { name: 'Item Two' },
      { name: 'Item Three' }
    ]);
  }
});

// API endpoint
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
