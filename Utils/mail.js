const nodemailer = require('nodemailer')
const {google}  = require('googleapis')
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.redirect_uris)
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

module.exports.sendMailWithGmail = async ( data)=>{

    const accessToken = await oAuth2Client.getAccessToken() 
    let transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:process.env.SENDER_MAIL,
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken:accessToken
        }
    })
    const mailData = {
        from:process.env.SENDER_MAIL,
        to:data.to,
        subject:data.subject,
        // text:data.text
        html:data.html
    }
    let info = await transport.sendMail(mailData)
    return info
    
}