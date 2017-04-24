package br.fatecsp.engsoft.service;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.entities.Card;
import br.fatecsp.engsoft.entities.Theme;
import br.fatecsp.engsoft.repositories.CardRepository;
import br.fatecsp.engsoft.web.enums.CardTypeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

	@Autowired
	private CardRepository cardRepository;
	
	@Autowired 
	private ThemeService themeService;
	
	public Card register(Long themeId,CardRequest request){
		Card card = Card.toEntity(request);
		Theme theme = themeService.find(themeId);
		card.setTheme(theme);
		return cardRepository.save(card);
	}
	
	public List<Card> findAllByTheme(Long id){
		return cardRepository.findAllByTheme(id);
	}
	
	public void remove(Long id){
		cardRepository.delete(id);
	}

	public Card update(Long id, CardRequest request) {
		Card card = cardRepository.findOne(id);
		card.setName(request.getName());
		card.setCardType(CardTypeEnum.valueOf(request.getType()));
		card.setCardSrc(request.getCardSrc());
		cardRepository.save(card);
		return card;
	}

	public Card getById(Long id) {
		return cardRepository.findOne(id);
	}
	
}
