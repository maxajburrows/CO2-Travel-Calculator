package travel.calculator.backend.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/travelCO2")
public class Controller {



    @GetMapping
    ResponseEntity<String> test() {
        String message = "Hello World";
        return ResponseEntity.ok(message);
    }
}
