require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

// Test database connection
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
        
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: false });
            console.log('✅ Database synchronized successfully.');
        }
        
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await sequelize.close();
    console.log('✅ Database connection closed.');
    process.exit(0);
});

startServer();
