const mailer = require('nodemailer');

const sendingMail = async (to, subject, text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: "sumitrabari42500@gmail.com",
            pass: "mwoa rlqs cegp llma"
        }
    })

    const mailOptions = {
        from: 'add your email id',
        to: to,
        subject: subject,
        text: text
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;


}

module.exports ={
    sendingMail
}