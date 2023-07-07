import React, { useRef, } from "react";
import axios from "axios";


type SearchFormProps = {
    setTravelMethods: React.Dispatch<React.SetStateAction<string[]>>
    setCO2Values: React.Dispatch<React.SetStateAction<number[]>>
    setETSValues: React.Dispatch<React.SetStateAction<number[]>>
    setGraphStatus: React.Dispatch<React.SetStateAction<string>>
}

const SearchForm = (props: SearchFormProps) => {
    const postcode1InputEl = useRef<HTMLInputElement>(null);
    const postcode2InputEl = useRef<HTMLInputElement>(null);
    const country1InputEl = useRef<HTMLInputElement>(null);
    const country2InputEl = useRef<HTMLInputElement>(null);
    const baseUrl = 'http://localhost:8080/api/travelCO2'

     const submit = async(e:React.ChangeEvent<HTMLFormElement>) => {
         e.preventDefault();
         console.log("submit happened")
         props.setGraphStatus('loading')
         const p1 = postcode1InputEl.current?.value;
         const p2 = postcode2InputEl.current?.value;
         const c1 = country1InputEl.current?.value;
         const c2 = country2InputEl.current?.value;
         // if (p1 == undefined || p2 == undefined || c1 == undefined || c2 == undefined) {
         //     return
         // }
         // console.log("got here")
         try {
             const co2Response = await axios.get(
                 `${baseUrl}/postcode1=${p1}&country1=${c1}&postcode2=${p2}&country2=${c2}`)
             const co2Data = co2Response.data;
             props.setTravelMethods(co2Data.methods);
             props.setCO2Values(co2Data.values);
             props.setETSValues(co2Data.valuesETS)
             props.setGraphStatus('fetched')
             console.log(co2Data)
         } catch (error) {
             console.error(error)
         }
     }
    return (
        <>
            <form onSubmit={submit} id='addDeveloperForm'>
                <section>
                    <h2>Start</h2>
                    <label htmlFor="postcode1">Postcode:</label>
                    <input id='postcode1' type='text' ref={postcode1InputEl}/>
                    <label htmlFor="country1">Country:</label>
                    <input id='country1' type='text' ref={country1InputEl}/>
                </section>
                <section>
                    <h2>Destination</h2>
                    <label htmlFor="postcode2">Postcode:</label>
                    <input id='postcode2' type='text' ref={postcode2InputEl}/>
                    <label htmlFor="country2">Country:</label>
                    <input id='country2' type='text' ref={country2InputEl}/>
                </section>
                <button>Search</button>
            </form>
        </>
    )
}

export default SearchForm