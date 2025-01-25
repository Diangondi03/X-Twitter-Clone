import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchInput from '../components/Profile/SearchSection/SearchInput';
import { useSearch } from '../hooks/useSearch';
import TabLayout from '../components/Profile/TabLayout';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Search = () => {
    const query = useQuery().get('q');
    const location = useLocation()

    const {top,latests,people,media} = useSearch(query)

    const tabs = ["Top","Latest","People","Media"]

    const urls = 
    [`/search?q=${query}&type=top`, `/search?q=${query}&type=latest`, `/search?q=${query}&type=people`, `/search?q=${query}&type=media`]
    

    const tabPanels = [top,latests,people,media]

    const errors = ["No posts to show","No posts to show","No people to show","No media to show"]

    if(!query){
        return <SearchInput/>
    }

    return (
        <>
        <SearchInput searchValue={query}/>
        <div className='mt-1'>

            <TabLayout 
            tabs={tabs}
            urls={urls} 
            tabPanels={tabPanels}
            isSearch={true}
            errors={errors}
            />
        </div>
        </>
    )
    }

export default Search