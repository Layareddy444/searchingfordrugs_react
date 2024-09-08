import React,{useState,useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const DrugDetails=()=>{
    const {drug_name}=useParams();
    const [drugDetails,setDrugDetails]=useState(null);
    const[error,setError]=useState("")

    useEffect(()=>{
        const fetchDrugDetails = async()=>{
            try{
                const response=await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drug_name}`);

                const rxcui=response.data.idGroup.rxnormId[0];
                const drugInfo=await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`);

                setDrugDetails(drugInfo.data.properties);
                setError("");
            }catch(err){
                console.error(err);
                setError("Failed to fetch drug details");
            }
        };
        fetchDrugDetails();},[drug_name]);

        if (error) return <p style={{color:'red'}}>{error}</p>;
        if(!drugDetails) return <p>Loading</p>;
        return (
            <div>
                <h1>Drug details: {drugDetails.name}</h1>
                <p>Synonyms: {drugDetails.synonym}</p>
            </div>
        );
    
};
export default DrugDetails;