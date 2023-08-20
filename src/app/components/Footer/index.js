import CopyRights from './CopyRights'
import MainFooter from './MainFooter'

export default function Footer(){
    return(
        <div className='bg-white'>
            <MainFooter/>
            <CopyRights/>
        </div>
    )
}