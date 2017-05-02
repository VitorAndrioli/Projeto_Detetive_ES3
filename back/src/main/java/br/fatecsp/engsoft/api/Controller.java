package br.fatecsp.engsoft.api;

import java.security.InvalidParameterException;
import java.util.StringJoiner;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

public class Controller {

	public static void verifyInvalidParam(final BindingResult errors){
		if(errors.hasErrors()) {
		
			StringJoiner str = new StringJoiner(", ","[","]");
			for(final FieldError selected : errors.getFieldErrors()){
				str.add(selected.getField().concat(": ").concat(selected.getDefaultMessage()));
			}
			
			throw new InvalidParameterException(str.toString());
			
		}
		
	}
	
}
