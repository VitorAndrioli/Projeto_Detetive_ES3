package br.fatecsp.engsoft.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
   
	@RequestMapping(value = "validation",method = RequestMethod.GET)
	public ResponseEntity<String> test(){
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}