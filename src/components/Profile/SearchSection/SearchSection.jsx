import React from 'react';
import SearchInput from './SearchInput';
import WhoToFollow from './WhoToFollow';
import WhatsHappening from './WhatsHapppening';

const SearchSection = () => {

  return (
    <>
      {location.pathname!='/explore' && location.pathname!='/search' ?
        <>
          <SearchInput/> 
          <WhatsHappening/>
        </> :
        <WhoToFollow/>
      }
      
    </>
  );
};

export default SearchSection;