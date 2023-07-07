package travel.calculator.backend.DTO;

import java.util.*;

public record ToFrontEndDTO(List<String> methods, List<Double> values, List<Double> valuesETS) {


    public ToFrontEndDTO(List<String> methods, List<Double> values, List<Double> valuesETS) {
        this.methods = methods;
        this.values = values;
        this.valuesETS = valuesETS;
    }
}
