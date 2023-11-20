const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.headers["authorization"];
  if (!userUid) return res.redirect("/login");
  const token = userUid.split("Bearer ")[1];
  const user = await getUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.headers["authorization"];
  const token = userUid.split("Bearer ")[1];
  const user = await getUser(token);
  if (user) {
    req.user = user;
  }
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
