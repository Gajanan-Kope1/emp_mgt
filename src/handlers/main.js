require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.join(__dirname, '../../files')));

const db = require("../app/models/index.js");
db.sequelize.sync().then(() => console.log("Synced db.")).catch((err) => console.log("Failed to sync db: " + err.message));

app.use((err, req, res, next) => { // body parser error catcher
	if (err instanceof SyntaxError) {
		res.status(400).json({status:400,msg:"Invalid Data send",data:null});
	}else {
		next();
	}
});

require("../app/middleware/auth/auth").verifyKeys(app); // Verify API Keys
require("../routes")(app,router); // All routes 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});