package br.fatecsp.engsoft.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.fatecsp.engsoft.entities.Theme;

@Repository
public interface ThemeRepository extends CrudRepository<Theme,Long>{

	List<Theme> findAll();
	
}
