package br.fatecsp.engsoft.web;

import br.fatecsp.engsoft.domain.CardRequest;
import br.fatecsp.engsoft.file.PhotosFile;
import br.fatecsp.engsoft.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
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

	@Value("${detetive.image.map}")
	private String filePath;

	@Value("${detetive.image.location}")
	private String fileLocation;

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ModelAndView listAll(@PathVariable Long id) {
		ModelAndView model = new ModelAndView("deck");
		model.addObject("cards", cardService.findAllByTheme(id));
		session.setAttribute("theme", id);
		return model;
	}

	@PostMapping(value = "/card", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ModelAndView register(@RequestParam("photo") MultipartFile photoFile, @RequestParam("name") String name,
			@RequestParam("type") String type

	) {
		String cardSrc = PhotosFile.createFile(photoFile, filePath);
		CardRequest cardRequest = new CardRequest(name, type, fileLocation + cardSrc);
		Long themeId = (Long) session.getAttribute("theme");
		cardService.register(themeId, cardRequest);
		return listAll(themeId);
	}

	@RequestMapping(value = "/card/{id}", method = RequestMethod.GET)
	public ModelAndView edit(@PathVariable("id") Long id) {
		ModelAndView model = new ModelAndView("editarCarta");
		model.addObject("card", cardService.getById(id));
		return model;
	}

	@PostMapping(value = "/card/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ModelAndView update(@PathVariable("id") Long id, @RequestParam("photo") MultipartFile photoFile,
			@RequestParam("name") String name, @RequestParam("type") String type) {
		String cardSrc = "";
		try {
			if (photoFile.getBytes().length != 0) {
				cardSrc = fileLocation + PhotosFile.createFile(photoFile, filePath);
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
	public ModelAndView register(@PathVariable("id") Long id) {
		Long themeId = (Long) session.getAttribute("theme");
		cardService.remove(id);
		return listAll(themeId);
	}

}
