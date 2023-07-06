package travel.calculator.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RouteResponseDTO {
    ArrayList<FeaturesDTO> features;

    public ArrayList<FeaturesDTO> getFeatures() {
        return features;
    }
}
