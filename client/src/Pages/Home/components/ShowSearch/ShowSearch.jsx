
import styles from './ShowSearch.module.css'

const ShowSearch = ({showSearchState, user, isLoading, error})=> {
    return(
        <div className={`${showSearchState ? styles.showSearchMain : styles.notShow}`}>

        </div>
    )
}

export default ShowSearch