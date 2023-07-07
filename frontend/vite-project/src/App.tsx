
import './App.css'
import { useState} from "react";
import BarChart from "./BarChart.tsx";
import SearchForm from "./SearchForm.tsx";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;



function App() {
        const [travelMethods, setTravelMethods] = useState<string[]>([])
        const [co2Values, setCO2Values] = useState<number[]>([])
        const [etsValues, setETSValues] = useState<number[]>([])
        const [graphStatus, setGraphStatus] = useState<string>('no input')
        const [showMessage, setShowMessage] = useState<boolean>(false)
        const [error, setError] = useState<boolean>(false)


    const loadingMessage = "The app is currently doing something very very impressive and cool. " +
            "Please wait patiently and prepare to gasp in awe, amazement and joy!"
    const title = "Travel like Greta"
    const bikeWinsMessage = "What are you waiting for?!?! Hop on your bike and ride on a wave of smugness to your destination."
    const trainWinsMessage = "Quick, go catch the next train!! Maybe have a chat with your fellow passengers about what brilliant people you are ;)"
    const carWinsMessage = "It's just not worth it for this one..... Get in the car, put your foot down and let's make everyone's summer holidays hotter!"
    const etsMessage = "ETS is a highly innovative metric on the cutting edge of climate science. It evaluates the merits of a travel option for a specific journey taking into account " +
        "travel time, distance travelled and CO2 emissions generated. It was conceived after tens of minutes of research by self proclaimed travel emssions expert " +
        "and all round fantastic bloke Max Burrows."
const errorMessage = "Unfortunately one of your locations either doesn't exist of is impossible to get to. Please try again."
    const aboutMessage = "Travel Like Greta allows you to compare the environmental credentials of different "

    const toggleMessage = () => {
            console.log("In funcky");
            if (!showMessage) {
                setShowMessage(true);
                return
            }
            setShowMessage(false);
    }
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
            <h1>{title}</h1>
            <SearchForm setTravelMethods={setTravelMethods} setCO2Values={setCO2Values} setETSValues={setETSValues} setGraphStatus={setGraphStatus} setError={setError}/>
            {error && <p className="error">{errorMessage}</p>}
            {(graphStatus == 'loading' && !error) && <p className="loading">{loadingMessage}</p>}
            {graphStatus == 'fetched' && <>

                <section className="bar">
                <h2>CO2 Emissions</h2>
                <BarChart co2Values={co2Values} travelMethods={travelMethods} chartYAxis={"CO2 Emitted (kg)"}/>
                </section>
                <section className="bar">
                <h2>Enviro Travel Score (ETS)</h2>
                <BarChart co2Values={etsValues} travelMethods={travelMethods} chartYAxis={"ETS"}/>
                </section>
                {((travelMethods[2] === 'bus') && (etsValues[4] > etsValues[2] && etsValues[4] > etsValues[3])
                        || (((travelMethods[2] === 'car') && (etsValues[3]>etsValues[2]&&etsValues[3]>etsValues[4]))))
                && <p className="loading">{bikeWinsMessage}</p>}
                {((travelMethods[2] === 'bus') && (etsValues[3] > etsValues[2] && etsValues[3] > etsValues[4])
                        || (((travelMethods[2] === 'car') && (etsValues[2]>etsValues[3]&&etsValues[2]>etsValues[4]))))
                    && <p className="loading">{carWinsMessage}</p>}
                {(((travelMethods[2] === 'car') && (etsValues[4]>etsValues[3]&&etsValues[4]>etsValues[2])))
                    && <p className="loading">{trainWinsMessage}</p>}
                <footer className="footnote" onClick={toggleMessage}>
                    <h3>Want to find out more about ETS? Click here!</h3>
                    {showMessage && <p className="standardWriting">{etsMessage}</p>}
                </footer>
            </>}

        </>)


}

export default App;
