const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.corsEnabledFunction = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).send("CORS is enabled for Firebase Storage.");
  });
});
