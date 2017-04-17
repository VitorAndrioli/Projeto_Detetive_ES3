package br.fatecsp.engsoft.entities;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.web.enums.CardTypeEnum;
import lombok.Data;

@Entity
@Table(name="Card")
@Data
public class Card {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@Enumerated
	private CardTypeEnum cardType;
	
	@OneToOne
	private Theme theme;
	
	public static Card toEntity(CardRequest request){
		Card card = new Card();
		card.setName(request.getName());
		card.setCardType(CardTypeEnum.valueOf(request.getType()));
		return card;
	}
	
}
