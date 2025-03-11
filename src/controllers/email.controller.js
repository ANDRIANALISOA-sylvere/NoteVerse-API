import * as nodemailer from "nodemailer";
const emailTransport = () => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transport;
};

export const sendEmail = async (req, res) => {
  const { recipients, subject, html } = req.body;
  const transport = emailTransport();
  const options = {
    from: process.env.EMAIL_USER,
    to: recipients,
    subject: subject,
    html: html,
  };
  try {
    await transport.sendMail(options);
    return res.json({
      message: "email sending successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error sending email: " + error,
    });
  }
};
