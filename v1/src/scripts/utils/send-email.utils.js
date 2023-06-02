const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const userService = require("../../services/user.service");

const sendEmail = async (subject, post) => {
  const emails = [];
  const users = await userService.list(1, 10, {});
  users.forEach((user) => {
    emails.push(user.email);
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: "v1/src/views/emails",
      defaultLayout: false,
    },
    viewPath: "v1/src/views/emails",
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));

  transporter.sendMail({
    from: process.env.GMAIL,
    to: emails,
    subject,
    template: "post-email",
    context: {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl || null,
    },
  });

  console.log("email sent sucessfully");
};

module.exports = sendEmail;
