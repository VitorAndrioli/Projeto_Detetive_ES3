package br.fatecsp.engsoft.domain;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ThemeRequest {

	private String name;
	private BigDecimal price;
	private String imageSrc;

	public ThemeRequest(String name, BigDecimal price, String imageSrc) {
		this.name = name;
		this.price = price;
		this.imageSrc = imageSrc;
	}
}
