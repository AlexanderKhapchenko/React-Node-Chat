const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const messageRoutes = require('./messageRoutes');

module.exports = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/auth', authRoutes);
  };