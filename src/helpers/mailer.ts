import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            ) 
        }

        var transport = nodemailer.createTransport({
            service: 'gmail',

            // host: "sandbox.smtp.mailtrap.io",
            host: "smtp.gmail.com",
            port: 2525,
            secure: true,
            auth: {
            // TODO - add these creds in env

            //   user: process.env.NODEMAILER_USERNAME,
            //   pass: process.env.NODEMAILER_PASSWORD

            user: 'freetourtickets162@gmail.com',
            pass: 'cvhhhffjrgkhftia'

            }
        });

        const mailOptions = {
            // from: 'musicstore@gmail.com', // create new email and and send it from there
            from: 'freetourtickets@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch (error: any) {
        throw new Error(error.message);
    }
}