package br.fatecsp.engsoft.domain;

import lombok.Data;

@Data
public class UserResponse {

	private Long id;
	private String username;
	private String token;
	
}
