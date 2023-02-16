const { OAuth2Client } = require("google-auth-library");
const controller = require("./controller");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const config = require("../utils/config");

const client = new OAuth2Client(config.CLIENT_ID);

const WARDEN_EMAIL = config.WARDEN_EMAIL;
const ADMIN_EMAILS = config.ADMIN_EMAILS;

const verifyToken = catchAsync(async (req, res, next) => {
  const { tokenId } = req.body;
  if (!tokenId) {
    return next(new AppError("User not logged in.", 403));
  }

  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: config.CLIENT_ID,
  });

  const { email } = response.payload;

  req.user = { email: email };

  next();
});

const googleLogin = catchAsync(async (req, res, next) => {
  const { hostel } = req.body;

  if (!hostel || !["BHR", "SHR", "RHR", "MHR", "GHR"].includes(hostel)) {
    throw new AppError("No hostel present", 400);
  }

  if (ADMIN_EMAILS.includes(req.user?.email)) {
    res.status(200).json({
      status: "success",
      message: "Admin Logged in",
    });
    return;
  }

  const isEligibleToVote = await controller.authCheck(hostel, req.user.email);

  if (isEligibleToVote) {
    res.status(200).json({
      status: "success",
      message: "Logged in successfully, allowed to vote",
    });
  }
});

module.exports = { googleLogin, verifyToken };
