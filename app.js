const express = require("express");
const cors = require("cors");
const appRoute = require("./routes");

const app = express();
const PORT = process.env.PORT || 4001;
app.use(cors());

appRoute(app);

app.listen(PORT, () => {
  console.info(`Server is start on http://localhost:${PORT}`);
});
