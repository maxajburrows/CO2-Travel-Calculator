import React, {SetStateAction, useRef, useState} from "react";
import axios from "axios";
import {saltyPersonDTO} from "./saltyPersonDTO.tsx";
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;

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
        console.log("submit happened")
        console.log(postcode1InputEl.current?.value);
         console.log(postcode2InputEl.current?.value);
         console.log(country1InputEl.current?.value);
         console.log(country2InputEl.current?.value);
         try {
             const co2Response = await axios.get(baseUrl, {
                 name: inputEl.current?.value,
                 bootcamp: bootcamp
             })
             const newDeveloper = newDeveloperResponse.data.developer
             props.setSaltyData([...props.saltyData, newDeveloper])
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
            </form>
        </>
    )
}

export default SearchForm