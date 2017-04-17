package br.fatecsp.engsoft.web.enums;

public enum CardTypeEnum {

	ARM("Arma"),PLACE("Lugar"),SUSPECT("Suspeito");
	
	private String type;

	private CardTypeEnum(String type){
		this.type = type;
	}
	
	public String getType() {
		return type;
	}	
	
}
