import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
export const passportConfig = function (app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
