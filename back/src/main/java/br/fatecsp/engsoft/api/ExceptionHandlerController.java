package br.fatecsp.engsoft.api;

import java.io.IOException;
import java.security.InvalidParameterException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.fatecsp.engsoft.api.exceptions.UserNotFound;

@ControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler{

	@ExceptionHandler({InvalidParameterException.class,UserNotFound.class})
	public void invalidParameterExceptionHandler(HttpServletResponse response,Exception e) throws IOException{
		response.sendError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
	}
	
}
