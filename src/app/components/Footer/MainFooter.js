import Image from "next/image";

export default function MainFooter(){
    return(
        <div>
            <Image
                src='/images/music-store-1.jpg'
                width={'150'}
                height={'50'}
            />
            <h3 className="text-[#161616] font-medium">MY ACCOUNT</h3>
            Sign in/Sign up
            Order History

            <h3 className="text-[#161616] font-medium">INSTRUMENTS</h3>
            link all the Instruments 

            <h3 className="text-[#161616] font-medium">FOR ONLINE ORDER & QUERIES:</h3>
            Write to dipeshsingh162@gmail.com
            Call on: 7840825848
            (MON-SAT : 10am - 6pm)

        </div>
    )
}