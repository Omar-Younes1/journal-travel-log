
function notFound(req, res, next) {
    res.status(404);
    next(new Error(`Not Found - ${req.originalUrl}`));
  }
  
  function errorHandler(err, req, res, _next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    res.status(statusCode).json({
      error: err.message || 'Server error'
    });
  }
  
  module.exports = { notFound, errorHandler };
  