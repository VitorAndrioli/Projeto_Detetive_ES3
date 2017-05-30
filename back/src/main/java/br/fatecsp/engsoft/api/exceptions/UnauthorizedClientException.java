package br.fatecsp.engsoft.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedClientException extends Exception {

	private static final long serialVersionUID = 7565461127649766627L;

	public UnauthorizedClientException(String msg){
		super(msg);
	}
	
}
