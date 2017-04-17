package br.fatecsp.engsoft.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.service.CardService;

@Controller
@RequestMapping("/deck/")
public class DeckController {

	@Autowired
	private HttpSession session;
	
	@Autowired
	private CardService cardService;
	
	@RequestMapping(value="{id}",method=RequestMethod.GET)
	public ModelAndView listAll(@PathVariable Long id){
		ModelAndView model = new ModelAndView("deck");
		model.addObject("cards", cardService.findAllByTheme(id));
		session.setAttribute("theme", id);
		return model;
	}
	
	@RequestMapping(value="/card",method = RequestMethod.POST)
	public ModelAndView register(CardRequest request){
		Long themeId = (Long)session.getAttribute("theme");
		cardService.register(themeId, request);
		return listAll(themeId);
	}
	
	@RequestMapping(value="/card/{id}",method=RequestMethod.GET)
	public ModelAndView edit(@PathVariable("id") Long id){
		ModelAndView model = new ModelAndView("editarCarta");
		model.addObject("card",cardService.getById(id));
		return model;
	}
	
	@RequestMapping(value="/card/{id}",method=RequestMethod.POST)
	public ModelAndView update(@PathVariable("id") Long id,CardRequest request){
		Long themeId = (Long)session.getAttribute("theme");
		cardService.update(id,request);
		return listAll(themeId);
	}
	
	@RequestMapping(value="/card/remove/{id}",method = RequestMethod.GET)
	public ModelAndView register(@PathVariable("id") Long id){
		Long themeId = (Long)session.getAttribute("theme");
		cardService.remove(id);
		return listAll(themeId);
	}
	
	
}
