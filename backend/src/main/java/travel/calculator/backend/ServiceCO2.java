package travel.calculator.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.calculator.backend.Client.ApiCall;
import travel.calculator.backend.DTO.LocationDTO;
import travel.calculator.backend.DTO.RouteResponseDTO;
import java.util.HashMap;
import java.util.Set;

@Service
public class ServiceCO2 {

    @Autowired
    ApiCall apiCall;

    private int CAR_CO2_PER_KM = 171;
    private int BIKE_CO2_PER_KM = 5;
    private int BUS_CO2_PER_KM = 104;
    private int TRAIN_CO2_PER_KM = 41;
    private int MOTOR_BIKE_CO2_PER_KM = 109;

    public HashMap<String, Double>[] makeDTOs(String postcode1, String country1, String postcode2, String country2) {
        HashMap<String,String>[] travelInfo = getDifferentTravelValues(postcode1, country1, postcode2, country2);

        HashMap<String, Double> mapCO2 = calculateCO2(travelInfo[0]);

        Double carDistance = Double.valueOf(travelInfo[0].get("car"));
        HashMap<String, String> timeMap = travelInfo[1];
        System.out.println(timeMap);

        HashMap<String, Double> mapETS = enviroTravelScore(mapCO2, timeMap, carDistance/1000);


        return new HashMap[]{mapCO2, mapETS};
    }

    public HashMap<String, Double> enviroTravelScore(HashMap<String, Double> mapCO2, HashMap<String, String> timeMap, Double carDistance) {
        System.out.println(timeMap);
        Set<String> keys = timeMap.keySet();
        HashMap<String, Double> mapETS = new HashMap<>();
        for (String key : keys) {
            String time = timeMap.get(key);
            System.out.println(key);
            Double ETS = (Math.pow(carDistance, 4.5)/(Math.pow((Double.valueOf(time)/3600),4.5)*(mapCO2.get(key))))/100000;
            System.out.println(Math.pow(carDistance, 3));
            System.out.println(time);
            System.out.println((mapCO2.get(key)));
            System.out.println(ETS);
            mapETS.put(key, ETS);
        }
        return mapETS;
    }
    public HashMap<String, Double> calculateCO2(HashMap<String, String> distances) {
        double carCO2 = Double.valueOf(distances.get("car"))*CAR_CO2_PER_KM/Math.pow(1000,2);
        double electricCarCO2 = carCO2/2;
        double bikeCO2 = Double.valueOf(distances.get("bike"))*BIKE_CO2_PER_KM/Math.pow(1000,2);
        double motorBikeCO2 = Double.valueOf(distances.get("bike"))*MOTOR_BIKE_CO2_PER_KM/Math.pow(1000,2);
        HashMap mapCO2 = new HashMap<String, Double>();
        mapCO2.put("car", carCO2);
        mapCO2.put("electric car", electricCarCO2);
        mapCO2.put("bike", bikeCO2);
        mapCO2.put("motorcycle", motorBikeCO2);
        if (distances.containsKey("bus")) {
            double busCO2 = Double.valueOf(distances.get("bus"))*BUS_CO2_PER_KM/Math.pow(1000,2);
            mapCO2.put("bus", busCO2);
            return mapCO2;
        }
        double busCO2 = Double.valueOf(distances.get("train"))*TRAIN_CO2_PER_KM/Math.pow(1000,2);
        mapCO2.put("train", busCO2);
        return mapCO2;
    }

    public HashMap<String, String>[] getDifferentTravelValues(String postcode1, String country1, String postcode2, String country2) {
        String[][] startAndEnd = getGeoStartAndEnd(postcode1, country1, postcode2, country2);
        String[] start = startAndEnd[0];
        String[] end = startAndEnd[1];
        String[] bike = getDistanceAndTime(start, end, "road_bike");
        String[] car = getDistanceAndTime(start, end, "drive");
        String[] motorbike = getDistanceAndTime(start, end, "motorcycle");
        String[] transit = getDistanceAndTime(start, end, "approximated_transit");
        HashMap<String, String> distancesMap = new HashMap<String, String>();
        distancesMap.put("car", car[0]);
        distancesMap.put("bike", bike[0]);
        distancesMap.put("motorcycle", motorbike[0]);
        HashMap<String, String> timesMap = new HashMap<>();
        timesMap.put("car", String.valueOf(Double.valueOf(car[1])*1.2));
        timesMap.put("electric car", String.valueOf(Double.valueOf(car[1])*1.2));
        timesMap.put("bike", bike[1]);
        timesMap.put("motorcycle", String.valueOf(Double.valueOf(motorbike[1])*1.2));
        if (Integer.valueOf(transit[0]) < 30000) {
            distancesMap.put("bus", transit[0]);
            timesMap.put("bus", transit[1]);
        } else {
            distancesMap.put("train", transit[0]);
            timesMap.put("train", String.valueOf(Double.valueOf(transit[1])*0.9));
        }
        return new HashMap[]{distancesMap, timesMap};
    }

    public String[] getDistanceAndTime(String[] startPoint, String[] endPoint, String mode) {
        RouteResponseDTO routeData = apiCall.getJourneyData(startPoint, endPoint, mode);
        String distance = String.valueOf(routeData.getFeatures().get(0).getProperties().getDistance());
        String time = String.valueOf(routeData.getFeatures().get(0).getProperties().getTime());
        return new String[]{distance, time};
    }

    public String[][] getGeoStartAndEnd(String postcode1, String country1, String postcode2, String country2) {
        LocationDTO location1 = apiCall.getGeoLocation(postcode1, country1);
        LocationDTO location2 = apiCall.getGeoLocation(postcode2, country2);
        String lat1 = location1.getFeatures().get(0).getProperties().getLatitude();
        String lat2 = location2.getFeatures().get(0).getProperties().getLatitude();
        String long1 = location1.getFeatures().get(0).getProperties().getLongitude();
        String long2 = location2.getFeatures().get(0).getProperties().getLongitude();
        String[] startPoint = new String[]{lat1, long1};
        String[] endPoint = new String[]{lat2, long2};
        return new String[][]{startPoint, endPoint};
    }
}
