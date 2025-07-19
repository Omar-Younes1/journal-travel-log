require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const entriesRouter = require('./routes/entries');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req,res)=>res.json({status:'ok'}));

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('✔ MongoDB connected'))
  .catch(e=> {
    console.error('MongoDB connection error:', e.message);
    // לא נסגור את השרת כדי שתוכל לראות את השגיאה
  });

app.use('/api/auth', authRouter);
app.use('/api/entries', entriesRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('🚀 Server running on port', port));
