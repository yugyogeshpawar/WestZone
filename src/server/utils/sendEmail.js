// 'src/server/utils/sendEmail'
import nodemailer from 'nodemailer'

export default async function sendEmail(to, url, txt) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`, // sender address
    to: to, // list of receivers
    subject: 'Password Recovery', // Subject line
    text: txt, // plain text body
    html: `<b>Please click on the following link, or paste this into your browser to complete the process:</b><a href=${url}>${url}</a>` // html body
  })

  console.log('Message sent: %s', info.messageId)
}
