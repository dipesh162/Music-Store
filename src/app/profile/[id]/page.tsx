export default function UserProfile({params}: any){
    return(
        <div className="flex flex-col items-center">
            <p>Profile Page</p>
            <span className="ml-2 p-2 rounded bg-orange-500"><h1>Profile {params.id}</h1></span>
        </div>
    )
}