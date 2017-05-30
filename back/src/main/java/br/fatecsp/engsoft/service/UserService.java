package br.fatecsp.engsoft.service;

import java.security.InvalidParameterException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.fatecsp.engsoft.api.exceptions.UserNotFound;
import br.fatecsp.engsoft.domain.UserRequest;
import br.fatecsp.engsoft.domain.UserResponse;
import br.fatecsp.engsoft.entities.Role;
import br.fatecsp.engsoft.entities.User;
import br.fatecsp.engsoft.repositories.RoleRepository;
import br.fatecsp.engsoft.repositories.UserRepository;

@Service
public class UserService {

	private static final String PLAYER = "PLAYER";

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	public UserResponse register(UserRequest user) {
		 Optional<User> userFinded = Optional.ofNullable(userRepository.findByUsername(user.getUsername()));
		 if(userFinded.isPresent()){
			 throw new InvalidParameterException("Usuario já cadastrado");
		 }
		
		User userEntity = new User();
		userEntity.setUsername(user.getUsername());
		userEntity.setPassword(encoder.encode(user.getPassword()));
		userEntity.setToken(encoder.encode(user.getUsername().concat(user.getPassword())));

		Optional<Role> roleOp = Optional.ofNullable(roleRepository.findByName(PLAYER));
		Role role = null;
		if (roleOp.isPresent()) {
			role = roleOp.get();
		} else {
			role = new Role();
			role.setName(PLAYER);
			roleRepository.save(role);
		}

		Set<Role> roles = new HashSet<>();
		roles.add(role);
		userEntity.setRoles(roles);

		userRepository.save(userEntity);

		UserResponse userResponse = new UserResponse();
		userResponse.setId(userEntity.getId());
		userResponse.setUsername(userEntity.getUsername());
		userResponse.setToken(userEntity.getToken());

		return userResponse;
	}

	public UserResponse login(UserRequest user) throws UserNotFound {
		Optional<User> entity = Optional.ofNullable(
				userRepository.findByUsername(user.getUsername()));
		User userEntity = entity.orElseThrow(() -> new UserNotFound("Usuario não existe"));
		if(!encoder.matches(user.getPassword(),userEntity.getPassword())){
			throw new UserNotFound("Senha invalida !");
		}
		UserResponse userResponse = new UserResponse();
		userResponse.setId(userEntity.getId());
		userResponse.setUsername(userEntity.getUsername());
		userResponse.setToken(userEntity.getToken());
		
		return userResponse;
	}

}
