const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Toshita <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // sendgrid XX BREVO
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in gmail "less secure app" option ---OUTDATED, use app passwords, OAuth2, Sendgrid/Mailtrap
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render child template
    const emailBody = await ejs.renderFile(
      `${__dirname}/../views/emails/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );
    // 2) Inject into base template
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/baseEmail.ejs`,
      {
        subject,
        body: emailBody,
      },
    );

    // 3) Define the email options
    const mailOptions = {
      // from: this.from,
      from: 'usedforlearning001@gmail.com',
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    // 4) Create a transport and send email
    const info = await this.newTransport().sendMail(mailOptions);

    console.log(info);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Voya Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
