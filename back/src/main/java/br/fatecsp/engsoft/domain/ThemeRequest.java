package br.fatecsp.engsoft.domain;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ThemeRequest {

	private String name;
	private BigDecimal price;
	
}
