package br.fatecsp.engsoft.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
		User userEntity = new User();
		userEntity.setUsername(user.getUsername());
		userEntity.setPassword(encoder.encode(user.getPassword()));
		
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

		return userResponse;
	}

}
