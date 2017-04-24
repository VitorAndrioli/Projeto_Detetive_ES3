package br.fatecsp.engsoft.domain;

import lombok.Data;

@Data
public class CardRequest {

	private String name;
	private String type;
	private String cardSrc;

    public CardRequest(String name, String type, String cardSrc) {
        this.name = name;
        this.type = type;
        this.cardSrc = cardSrc;
    }
}
