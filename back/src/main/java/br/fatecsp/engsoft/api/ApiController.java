package br.fatecsp.engsoft.api;

import br.fatecsp.engsoft.domain.Greeting;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    
	@RequestMapping("/api/greeting")
    @ResponseBody
    public Greeting index(@RequestParam(value="name", required=false, defaultValue="World") String name) {
        return new Greeting("Hello, " + name);
    }
    
}
