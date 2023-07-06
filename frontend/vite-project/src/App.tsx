
import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import BarChart from "./BarChart.tsx";
import SearchForm from "./SearchForm.tsx";







function App() {
        const [travelMethods, setTravelMethods] = useState<string[]>([])
        const [co2Values, setCO2Values] = useState<number[]>([])


    // const getDataFromBackend = async () => {
    //     try {
    //         console.log((await axios.get(`http://localhost:8080/api/travelCO2`)));
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    //
    //     useEffect(() => {
    //         getDataFromBackend()
    //     }, []);

        return (<>
            <SearchForm travelMethods={travelMethods} setTravelMethods={setTravelMethods} co2Values={co2Values} setCO2Values={setCO2Values}/>
            <BarChart/>
            </>
        )

}

export default App;
