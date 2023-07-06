import React, {SetStateAction, useRef, useState} from "react";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";


type SearchFormProps = {
    travelMethods: string[]
    setTravelMethods: React.Dispatch<SetStateAction<string[]>>
    co2Values: number
    setCO2Values: React.Dispatch<SetStateAction<number>>
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
         const p1 = postcode1InputEl.current?.value;
         const p2 = postcode2InputEl.current?.value;
         const c1 = country1InputEl.current?.value;
         const c2 = country2InputEl.current?.value;
         // if (p1 == undefined || p2 == undefined || c1 == undefined || c2 == undefined) {
         //     return
         // }
         console.log("got here")
         try {
             const co2Response = await axios.get(
             `${baseUrl}/postcode1=${p1}&country1=${c1}&postcode2=${p2}&country2=${c2}`)
             const co2Data = co2Response.data;
             console.log(co2Data)
         } catch (error) {
             console.error(error)
         }
    //     e.preventDefault()
    //     const checkIfValid = developerNameFormat.test(`${inputEl.current?.value}`)
    //     if (!checkIfValid) {
    //         setValidNameInput(false)
    //         return
    //     }
    //     setValidNameInput(true)
    //     if (inputEl.current?.value) {
    //         try {
    //             const newDeveloperResponse = await axios.post(baseUrl, {
    //                 name: inputEl.current?.value,
    //                 bootcamp: bootcamp
    //             })
    //             const newDeveloper = newDeveloperResponse.data.developer
    //             props.setSaltyData([...props.saltyData, newDeveloper])
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
     }
    //
    // const changeBootcamp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     e.preventDefault()
    //     setBootcamp(e.target.value)
    // }

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