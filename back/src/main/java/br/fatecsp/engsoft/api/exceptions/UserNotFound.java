package br.fatecsp.engsoft.api.exceptions;

public class UserNotFound extends Exception{

	private static final long serialVersionUID = -5964336109894256433L;

	public UserNotFound(String msg){
		super(msg);
	}
	
}
