const path = require("path");

const User = require("../models/User");

//* User Login Page
exports.userLogin = (req, res) => {
  if (req.cookies.fullname) res.render("chat", {
    fullname: req.cookies.fullname
  })
  res.render("login", {
    pageTitle: "Sign in",
    msg: ""
  });
};


//*  User Register Page
exports.userRegister = (req, res) => {
  res.render("register", {
    pageTitle: "Sign up",
    error: "",
  });
};


//* Handle User Register
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      const error = new Error("کلمه های عبور یکسان نیستند");
      // throw error
      console.log(error.message);
      return res.render("register", {
        pageTitle: "Sign up",
        error: error.message,
      });
    }
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      const error = new Error("این ادرس ایمیل قبلا استفاده شده است.");
      console.log(error.message);
      return res.render("register", {
        pageTitle: "Sign up",
        error: error.message,
      });
    }
    await User.create({
      fullname,
      email,
      password,
    });
    console.log("User Created");
    return res.render("login", {
      pageTitle: "Sign in",
      msg: ""
    });
  } catch (err) {
    console.log(err);
  }
};


//* Handle User Login
exports.handleLogin = async (req, res) => {
  try {
    const { email, password, chatrooms } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && user.password === password) {
      res.cookie("fullname", user.fullname, {
        maxAge: 86400000              // 1 day
      });
      res.cookie("chatroom", chatrooms, {
        maxAge: 86400000              // 1 day
      }).render("chat", {
        fullname: user.fullname
      })

    } else {
      res.render("login", {
        pageTitle: "Sign in",
        msg: "نام کاربری یا کلمه عبور صحیح نیست.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

