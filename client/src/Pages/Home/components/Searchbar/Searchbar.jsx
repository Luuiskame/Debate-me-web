import styles from "./Searchbar.module.css";

import { useState } from "react";
// redux
import { useGetUserByUsernameQuery } from "../../../../redux/apiSlices/userAPI";

const Searchbar = () => {
  const [username, setUsername] = useState('')
  const {data: user, isLoading, isError} = useGetUserByUsernameQuery(username)
  console.log(user)

  const handleSearch = ()=>{

  }
  
  return (
    <>
      <input 
      className={styles.searchBar} 
      type="text" 
      placeholder="User name" 
      onChange={(e)=> setUsername(e.target.value)}
      />
      <button 
      className={styles.searchIcon}
      onClick={handleSearch}
      >
        <img
          className={styles.searchimg}
          src="./resources/png/search-icon.png"
          alt=""
        />
      </button>
    </>
  );
};

export default Searchbar;
