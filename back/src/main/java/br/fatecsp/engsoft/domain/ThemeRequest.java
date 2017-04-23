package br.fatecsp.engsoft.domain;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ThemeRequest {

	private String name;
	private BigDecimal price;
	private String imageSrc;
	
}
