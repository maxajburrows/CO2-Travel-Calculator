package travel.calculator.backend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import travel.calculator.backend.DTO.ToFrontEndDTO;
import travel.calculator.backend.ServiceCO2;

import java.util.*;

@RestController
@RequestMapping("/api/travelCO2")
public class Controller {

    @Autowired
    ServiceCO2 serviceCO2;

    @GetMapping("/postcode1={postcode1}&country1={country1}&postcode2={postcode2}&country2={country2}")
    ResponseEntity<ToFrontEndDTO> giveCO2Values(@PathVariable String postcode1, @PathVariable String country1, @PathVariable String postcode2, @PathVariable String country2) {
        String postcode1NoBraces = postcode1.replaceAll("[{}]", "");
        System.out.println(postcode1);
        System.out.println(country1);
        System.out.println(postcode1NoBraces);
        HashMap<String, Double> co2Data = serviceCO2.makeDTOs(postcode1.replaceAll("[{}]", ""), country1.replaceAll("[{}]", ""),postcode2.replaceAll("[{}]", ""),country2.replaceAll("[{}]", ""));
        List<String> methods = new ArrayList<>();
        List<Double> values = new ArrayList<>();
        Set<String> keys = co2Data.keySet();
        for (String key : keys) {
            methods.add(key);
            values.add(co2Data.get(key));
        }

        ToFrontEndDTO sendToFront = new ToFrontEndDTO(methods, values);

        return ResponseEntity.ok(sendToFront);
    }
}
