const sgMail = require("@sendgrid/mail");
// const sendgridApiKey = "set environment variable in config folder";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to:'rounakpatni234@gmail.com',
//     from:'rounakpatni234@gmail.com',
//     subject:'first email',
//     text:'this is a second text i am sending '
// })

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "rounakpatni234@gmail.com",
    subject: "thank you for joining",
    text: `welcome to the app, ${name}`,
  });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
      to: email,
      from: "rounakpatni234@gmail.com",
      subject: "ACCOUNT DELETING",
      text: `goodbye, ${name} its good to have you as our customer `,
    });
  };

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}