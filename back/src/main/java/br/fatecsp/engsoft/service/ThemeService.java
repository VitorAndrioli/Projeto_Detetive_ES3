package br.fatecsp.engsoft.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.fatecsp.engsoft.domain.ThemeRequest;
import br.fatecsp.engsoft.entities.Theme;
import br.fatecsp.engsoft.repositories.ThemeRepository;

@Service
public class ThemeService {

	@Autowired
	private ThemeRepository themeRepository;
	
	public Theme register(ThemeRequest request){
		Theme theme = Theme.toEntity(request);
		themeRepository.save(theme);
		return theme;
	}
	
	public List<Theme> findAll(){
		return themeRepository.findAll();
	}

	public Theme find(Long id) {
		return themeRepository.findOne(id);
	}

	public Theme update(Long id, ThemeRequest request) {
		Theme theme = themeRepository.findOne(id);
		theme.setName(request.getName());
		theme.setPrice(request.getPrice());
		themeRepository.save(theme);
		return theme;
	}

	public void remove(Long id) {
		themeRepository.delete(id);
	}
	
}
