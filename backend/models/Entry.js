const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title:    { type: String, required: true, trim: true, maxlength: 120 },
  content:  { type: String, required: true },
  date:     { type: Date, default: Date.now },
  location: { type: String, trim: true, maxlength: 120 },
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: v => !v || /^https?:\/\/\S+$/i.test(v),
      message: 'Invalid image URL'
    }
  }
}, {
  timestamps: true
});

entrySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Entry', entrySchema);
