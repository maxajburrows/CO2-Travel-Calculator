package travel.calculator.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import travel.calculator.backend.DTO.RouteResponseDTO;

import java.util.Arrays;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ServiceCO2Test {

    @Autowired
    ServiceCO2 serviceCO2;

    @Test
    public void getRouteInfo() {
        HashMap[] routeData = serviceCO2.getDifferentTravelValues("1015lx", "Netherlands", "1112zb", "Netherlands");

        System.out.println((routeData[0]));
        System.out.println((routeData[1]));
        assertNotNull(routeData[0]);
        assertNotNull(routeData[1]);
    }

//    @Test
//    public void calculateDaCO2() {
//        HashMap<String, Double> co2Data = serviceCO2.makeDTOs("1015lx", "Netherlands", "1112zb", "Netherlands");
//
//        System.out.println(co2Data);
//
//        assertNotNull(co2Data);
//
//    }
}

