package br.fatecsp.engsoft.domain;

import org.hibernate.validator.constraints.NotEmpty;

import lombok.Data;

@Data
public class UserRequest {

	@NotEmpty
	private String username;
	
	@NotEmpty
	private String password;
	
}
