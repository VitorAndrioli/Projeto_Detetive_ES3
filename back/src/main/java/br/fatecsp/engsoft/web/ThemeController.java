package br.fatecsp.engsoft.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.fatecsp.engsoft.domain.ThemeRequest;
import br.fatecsp.engsoft.entities.Theme;
import br.fatecsp.engsoft.service.ThemeService;

@Controller
@RequestMapping("/themes")
public class ThemeController {

	@Autowired
	private ThemeService themeService;

	@RequestMapping(method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView register(ThemeRequest request) {
		themeService.register(request);
		return listAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ModelAndView update(@PathVariable("id") Long id,ThemeRequest request) {
		themeService.update(id,request);
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
