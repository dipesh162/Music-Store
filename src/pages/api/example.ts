import { NextApiRequest, NextApiResponse } from "next";


const handler = (req: NextApiRequest, res: NextApiResponse) =>{
    const body = req.body
    console.log('asd')

    // res.status(200).end()
    res.status(200).send('asd')
}

export default handler