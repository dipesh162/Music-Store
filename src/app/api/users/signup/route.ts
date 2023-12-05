import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer"

connect()


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {firstName, lastName, email, password} = reqBody

        // Check if user already exists
        const userExists = await User.findOne({email})

        if(userExists){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        let user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        let savedUser = await user.save()

        const hashedToken = await bcryptjs.hash(savedUser._id.toString(), 10)
        user.token = hashedToken
        const updatedUser = await user.save()

        // send verification email
        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        // userId: savedUser._id


        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            user : {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                token: updatedUser.token
            }
        })
        response.cookies.set("token",updatedUser.token, {
            httpOnly: true
        })

        return response
    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}