package br.fatecsp.engsoft.entities;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.web.enums.CardTypeEnum;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="Card")
@Data
public class Card {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;

	private String cardSrc;
	
	@Enumerated
	private CardTypeEnum cardType;
	
	@OneToOne
	private Theme theme;
	
	public static Card toEntity(CardRequest request){
		Card card = new Card();
		card.setName(request.getName());
		card.setCardType(CardTypeEnum.valueOf(request.getType()));
		card.setCardSrc( request.getCardSrc());
		return card;
	}
	
}
