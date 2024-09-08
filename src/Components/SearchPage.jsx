import React,{useState} from 'react';
import axios from 'axios';
import { FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom';

const SearchPage =()=>{
    const [query,setQuery]=useState("");
    const [drugs,setDrugs]=useState([]);
    const [error,setError]=useState("");

    const handleSearch= async ()=>{
        if (query ==="") return;

        try {
            const response=await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
            if(response.data.drugGroup.conceptGroup){
                setDrugs(response.data.drugGroup.conceptGroup);
                setError("");
            }else{
                setError("no results found");
                setDrugs([]);
            }
        }catch(err){
            console.error(err);
            setError("failed to fetch results");
        }
    };

    const handleInputChange=(event)=>{
        setQuery(event.target.value);
    }; 


return (
    <div>
        <h1>Search for Drugs</h1>
        <div style={{display:'flex',alignItems:'center',marginBottom:'20px'}}>

            <input type="text" placeholder="Enter drug name.." value={query} onChange={handleInputChange} style={{padding:"10px", fontSize:'16px',width:'200px'}}></input>

            <button onClick={handleSearch} style={{marginLeft:'10px',padding:'10px'}}><FaSearch size={20}/></button>
        </div>

        {error && <p style={{color:'red'}}>{error}</p>}
        <ul>
            {drugs.map((drugGroup, index)=> (
                <li key={index}>

                {drugGroup.conceptProperties.map((drug)=>(
                    <p key={drug.rxcui}>
                    <Link to={`/drugs/${drug.name}`} style={{ textDecoration: 'none', color: 'blue' }}>
                        {drug.name}
                    </Link>
                </p>
            ))}
            </li>
            ))}
        </ul>
    </div>
);
};
export default SearchPage;