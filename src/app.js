const express = require("express");
const { initializeDatabase } = require("./db/init");
const awardRoutes = require("./routes/awards");

const app = express();
app.use(express.json());

app.use("/producers", awardRoutes);

const PORT = 3000;
(async () => {
  await initializeDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
