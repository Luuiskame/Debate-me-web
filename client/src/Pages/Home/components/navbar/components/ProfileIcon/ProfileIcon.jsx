import styles from './ProfileIcon.module.css'
import { CiUser } from "react-icons/ci";


const ProfileIcon = ()=> {

    return (
       <>
         <CiUser color="#08616d" className={styles.UserIcon}/>
       </>
    )
}

export default ProfileIcon