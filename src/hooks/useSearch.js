import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

export const useSearch = (query)=>{
    const [top,setTop] = useState([])
    const [latests,setLatests] = useState([])
    const [people,setPeople] = useState([])
    const [media,setMedia] = useState([])

    useEffect(()=>{

        const fetchData = async () => {
            try {
            if (query) {
                const [topResponse, latestsResponse, peopleResponse, mediaResponse] = await Promise.all([
                axios.get(`http://localhost:5000/api/search/top?q=${query}`),
                axios.get(`http://localhost:5000/api/search/latest?q=${query}`),
                axios.get(`http://localhost:5000/api/search/people?q=${query}`),
                axios.get(`http://localhost:5000/api/search/media?q=${query}`)
                ]);

                setTop(topResponse.data);
                setLatests(latestsResponse.data);
                setPeople(peopleResponse.data);
                setMedia(mediaResponse.data);
            }
            } catch (error) {
            console.error("Error fetching search results:", error);
            }
        };

        fetchData();
    },[query])


    return {top,latests,people,media}
}