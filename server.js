const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.sync({ force: false }); // Ensure database tables are created
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Database sync error:", error);
    }
})();
