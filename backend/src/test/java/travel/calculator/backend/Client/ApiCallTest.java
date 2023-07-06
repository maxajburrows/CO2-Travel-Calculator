package travel.calculator.backend.Client;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import travel.calculator.backend.DTO.LocationDTO;
import travel.calculator.backend.DTO.RouteResponseDTO;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ApiCallTest {

    @Autowired
    ApiCall apiCall;

    @Test
    public void canMakeApiCall() {
        RouteResponseDTO response = apiCall.getJourneyData(new String[]{"50.96209827745463", "4.414458883409225"},
                new String[]{"50.429137079078345", "5.00088081232559"}, "drive");
        System.out.println(response.getFeatures().get(0).getProperties());
        System.out.println(response.getFeatures().get(0).getProperties().getDistance());
        System.out.println(response.getFeatures().get(0).getProperties().getTime());


        assertNotNull(response.getFeatures().get(0).getProperties().getDistance());
        assertNotNull(response.getFeatures().get(0).getProperties().getTime());
    }

    @Test
    public void getLongAndLat() {
        LocationDTO response = apiCall.getGeoLocation("1015Lx", "Netherlands");
        System.out.println(response.getFeatures().get(0).getProperties());
        System.out.println(response.getFeatures().get(0).getProperties().getLatitude());
        System.out.println(response.getFeatures().get(0).getProperties().getLongitude());


        assertNotNull(response.getFeatures().get(0).getProperties().getLatitude());
        assertNotNull(response.getFeatures().get(0).getProperties().getLongitude());
    }
}
