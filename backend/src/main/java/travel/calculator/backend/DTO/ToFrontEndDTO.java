package travel.calculator.backend.DTO;

import java.util.*;

public record ToFrontEndDTO(List<String> methods, List<Double> values) {


    public ToFrontEndDTO(List<String> methods, List<Double> values) {
        this.methods = methods;
        this.values = values;
    }
}
