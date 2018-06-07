var express = require("express"), path = require("path"), app = express();
app.use(express.static(path.join(__dirname, "dist/")));
app.listen(8082, function() {
	console.log("server is listening 8082")
});