import styles from "./Searchbar.module.css";
// react
import { useState, useEffect } from "react";

// redux
import { useGetUserByUsernameQuery } from "../../../../../../redux/apiSlices/userAPI";

// componentes
import ShowSearch from "../ShowSearch/ShowSearch";

const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [searchData, setSearchData] = useState("");
  // state for showing our showSearch component
  const [showSearchState, setShowSearchState] = useState(false);
  const { data: user, isLoading, isError, error } = useGetUserByUsernameQuery(username);
  console.log(user);
  console.log(error);
  const handleSearch = () => {
    setUsername(searchData);
    setShowSearchState(true);
  };

  useEffect(() => {
    if (searchData.length < 3) {
      setUsername("");
      setShowSearchState(false);
    }
  }, [searchData]);

  return (
    <>
      <input className={styles.searchBar} type="search" placeholder="User name" onChange={(e) => setSearchData(e.target.value)} />
      <button className={styles.searchIcon} onClick={handleSearch}>
        <img className={styles.searchimg} src="./resources/png/search-icon.png" alt="" />
      </button>

      <ShowSearch showSearchState={showSearchState} user={user} isLoading={isLoading} error={error} />
    </>
  );
};

export default Searchbar;
