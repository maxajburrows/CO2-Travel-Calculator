package travel.calculator.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationDTO {
    ArrayList<LocationFeaturesDTO> features;

    public ArrayList<LocationFeaturesDTO> getFeatures() {
        return features;
    }
}
