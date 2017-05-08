package br.fatecsp.engsoft.web;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.file.PhotosFile;
import br.fatecsp.engsoft.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
@RequestMapping("/deck/")
public class DeckController {

	@Autowired
	private HttpSession session;

	@Autowired
	private CardService cardService;

	@Autowired
	private PhotosFile photosFile;

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView listAll(@PathVariable Long id) {
		ModelAndView model = new ModelAndView("deck");
		model.addObject("cards", cardService.findAllByTheme(id));
		session.setAttribute("theme", id);
		return model;
	}

	@PostMapping(value = "/card", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView register(@RequestParam("photo") MultipartFile photoFile, @RequestParam("name") String name,
			@RequestParam("type") String type

	) {
		String cardSrc = photosFile.createFile(photoFile);
		CardRequest cardRequest = new CardRequest(name, type,  cardSrc);
		Long themeId = (Long) session.getAttribute("theme");
		cardService.register(themeId, cardRequest);
		return listAll(themeId);
	}

	@RequestMapping(value = "/card/{id}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView edit(@PathVariable("id") Long id) {
		ModelAndView model = new ModelAndView("editarCarta");
		model.addObject("card", cardService.getById(id));
		return model;
	}

	@PostMapping(value = "/card/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView update(@PathVariable("id") Long id, @RequestParam("photo") MultipartFile photoFile,
			@RequestParam("name") String name, @RequestParam("type") String type) {
		String cardSrc = "";
		try {
			if (photoFile.getBytes().length != 0) {
				cardSrc = photosFile.createFile(photoFile);
			} else {
				cardSrc = cardService.getById(id).getCardSrc();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		CardRequest cardRequest = new CardRequest(name, type, cardSrc);
		Long themeId = (Long) session.getAttribute("theme");
		cardService.update(id, cardRequest);
		return listAll(themeId);
	}

	@RequestMapping(value = "/card/remove/{id}", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView register(@PathVariable("id") Long id) {
		Long themeId = (Long) session.getAttribute("theme");
		cardService.remove(id);
		return listAll(themeId);
	}

}
