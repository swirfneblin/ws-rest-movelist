const express = require("express");
const { initializeDatabase } = require("./db/init");
const awardRoutes = require("./routes/awards");

const app = express();
app.use(express.json());

app.use("/producers", awardRoutes);

module.exports = app;

if (require.main === module) {
  (async () => {
    await initializeDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })();
}
