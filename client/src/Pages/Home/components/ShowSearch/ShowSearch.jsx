
import styles from './ShowSearch.module.css'

//components
import UserCard from '../UserCard/UserCard'

const ShowSearch = ({showSearchState, user, isLoading, error})=> {
    return(
        <div className={`${showSearchState ? styles.showSearchMain : styles.notShow}`}>
            {user ? <UserCard user={user}/> : ''}
            {error ? <p>{error.data}</p> : ''}
            {isLoading ? <p>loading...</p> : ''}
        </div>
    )
}

export default ShowSearch