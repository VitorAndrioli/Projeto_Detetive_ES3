package br.fatecsp.engsoft.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.fatecsp.engsoft.entities.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long>{

}
