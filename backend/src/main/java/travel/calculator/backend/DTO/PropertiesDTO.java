package travel.calculator.backend.DTO;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PropertiesDTO {
     public int distance;

     public double time;

    public int getDistance() {
        return distance;
    }

    public double getTime() {
        return time;
    }
}
