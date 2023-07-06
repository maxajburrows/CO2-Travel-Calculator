package travel.calculator.backend.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import travel.calculator.backend.DTO.LocationDTO;
import travel.calculator.backend.DTO.RouteResponseDTO;

@Service
public class ApiCall {

    String BASE_URL = "https://api.geoapify.com/v1/";
    String ROUTE_API_KEY = "fbe72c5154704463b1808f303df6b8ca";

    private RestTemplate restTemplate;

    public ApiCall(@Autowired RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public LocationDTO getGeoLocation(String postcode, String country) {
        String url = BASE_URL+"geocode/search?postcode="+postcode+"&country="+country+"&apiKey="+ROUTE_API_KEY;
        System.out.println(url);
        try {
            ResponseEntity<LocationDTO> entity = restTemplate.exchange(url, HttpMethod.GET, HttpEntity.EMPTY, LocationDTO.class);
            System.out.println(entity);
            LocationDTO body = entity.getBody();
            System.out.println(body);
            return body;
        } catch(RestClientException ex) {
            return null;
        }
    }

    public RouteResponseDTO getJourneyData(String[] startPoint, String[] endPoint, String mode) {
//        System.out.println("In the function");
        String url = BASE_URL+"routing?waypoints="+startPoint[0]+","+startPoint[1]+"|"+endPoint[0]+","+endPoint[1]+"&mode="+mode+"&apiKey="+ROUTE_API_KEY;
        System.out.println(url);
        try {
            ResponseEntity<RouteResponseDTO> entity = restTemplate.exchange(url, HttpMethod.GET, HttpEntity.EMPTY, RouteResponseDTO.class);
            System.out.println(entity);
            RouteResponseDTO body = entity.getBody();
            System.out.println(body);
            return body;
        } catch(RestClientException ex) {
            return null;
        }
    }
}
