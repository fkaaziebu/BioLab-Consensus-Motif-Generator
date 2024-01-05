const sequelize = require("./config/sequelize");
const app = require("./app");

const port = 5000;

sequelize.sync({});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
