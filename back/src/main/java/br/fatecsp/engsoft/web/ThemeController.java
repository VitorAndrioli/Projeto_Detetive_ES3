package br.fatecsp.engsoft.web;

import br.fatecsp.engsoft.domain.ThemeRequest;
import br.fatecsp.engsoft.entities.Theme;
import br.fatecsp.engsoft.file.PhotosFile;
import br.fatecsp.engsoft.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;



@Controller
@RequestMapping("/themes")
public class ThemeController {

	@Value("${detetive.image.map}")
	private String filePath;


	@Value("${detetive.image.location}")
	private String fileLocation;

	@Autowired
	private PhotosFile photosFile;

	@Autowired
	private ThemeService themeService;

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView register(@RequestParam("photo")MultipartFile photoFile, @RequestParam("name") String name, @RequestParam("price") BigDecimal price) {

		String boardSrc = photosFile.createFile(photoFile);
		ThemeRequest themeDTO = new ThemeRequest(name, price, boardSrc);
		themeService.register(themeDTO);
		return listAll();
	}

	@PostMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView update(@PathVariable("id") Long id,@RequestParam("photo")MultipartFile photoFile, @RequestParam("name") String name, @RequestParam("price") BigDecimal price) {
		String boardSrc = "";
		try {
			if (photoFile.getBytes().length != 0) {
				boardSrc = photosFile.createFile(photoFile);
			} else {
				boardSrc = themeService.find(id).getImageSrc();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		ThemeRequest themeDTO = new ThemeRequest(name, price, boardSrc );
		themeService.update(id,themeDTO);
		return listAll();
	}

	
	@RequestMapping(method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView listAll() {
		ModelAndView model = new ModelAndView("themes");
		List<Theme> themes = themeService.findAll();
		model.addObject("themes",themes);
		return model;
	}
	
	@RequestMapping(value="/remove/{id}",method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView remove(@PathVariable("id") Long id){
		themeService.remove(id);
		return listAll();
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView edit(@PathVariable("id") Long id){
		ModelAndView model = new ModelAndView("editTheme");
		model.addObject("theme",themeService.find(id));
		return model;
	}

}
