package br.fatecsp.engsoft.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.fatecsp.engsoft.entities.Card;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {

	@Query(value="select c from Card c where c.theme.id = :id")
	List<Card> findAllByTheme(@Param("id") Long id);
	
}
