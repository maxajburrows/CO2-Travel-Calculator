
import './App.css'
import {useEffect, useState} from "react";
import BarChart from "./BarChart.tsx";
import SearchForm from "./SearchForm.tsx";







function App() {
        const [travelMethods, setTravelMethods] = useState<string[]>([])
        const [co2Values, setCO2Values] = useState<number[]>([])
        const [graphStatus, setGraphStatus] = useState<string>('no input')
        const loadingMessage = "The app is currently doing something very very impressive and cool." +
            "Please wait patiently and prepare to gasp in awe, amazement and joy!"



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
            <SearchForm setTravelMethods={setTravelMethods} setCO2Values={setCO2Values} setGraphStatus={setGraphStatus}/>
            {graphStatus == 'loading' && <p>{loadingMessage}</p>}
            {graphStatus == 'fetched' && <BarChart co2Values={co2Values} travelMethods={travelMethods}/>}
            </>
        )

}

export default App;
