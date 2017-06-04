package br.fatecsp.engsoft.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.fatecsp.engsoft.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);

}
