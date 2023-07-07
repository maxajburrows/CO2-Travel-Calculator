
import './App.css'
import { useState} from "react";
import BarChart from "./BarChart.tsx";
import SearchForm from "./SearchForm.tsx";







function App() {
        const [travelMethods, setTravelMethods] = useState<string[]>([])
        const [co2Values, setCO2Values] = useState<number[]>([])
        const [etsValues, setETSValues] = useState<number[]>([])
        const [graphStatus, setGraphStatus] = useState<string>('no input')
        const loadingMessage = "The app is currently doing something very very impressive and cool. " +
            "Please wait patiently and prepare to gasp in awe, amazement and joy!"


console.log(etsValues)
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
            <SearchForm setTravelMethods={setTravelMethods} setCO2Values={setCO2Values} setETSValues={setETSValues} setGraphStatus={setGraphStatus}/>
            {graphStatus == 'loading' && <p className="loading">{loadingMessage}</p>}
            {graphStatus == 'fetched' && <>

                <section className="bar">
                <h2>CO2 Emissions</h2>
                <BarChart co2Values={co2Values} travelMethods={travelMethods} chartYAxis={"CO2 Emitted (kg)"}/>
                </section>
                <section className="bar">
                <h2>ETS Score</h2>
                <BarChart co2Values={etsValues} travelMethods={travelMethods} chartYAxis={"ETS"}/>
                </section>
            </>}
        </>)


}

export default App;
