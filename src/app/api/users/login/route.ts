import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

connect()


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody

        // Check if user doesn't exist
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        } 

        // Create token data
            // const tokenData = {
            //     id: user._id,
            //     email: user.email,
            // }

            // Create token
            // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user : {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                // isAdmin: user.isAdmin,
                // isVerified: user.isVerified,
                // token: token
                token: user.token
            }
        })
        // response.cookies.set("token",token, {
        response.cookies.set("token",user.token, {
            httpOnly: true
        })

        return response
    } catch (err: any){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}