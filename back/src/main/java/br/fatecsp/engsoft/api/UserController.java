package br.fatecsp.engsoft.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.fatecsp.engsoft.domain.UserRequest;
import br.fatecsp.engsoft.domain.UserResponse;
import br.fatecsp.engsoft.service.UserService;

@RestController
@RequestMapping("/api/")
public class UserController extends Controller{

	@Autowired
	private UserService userService;
	
	@RequestMapping(value="register",method = RequestMethod.POST)
	public UserResponse register(@RequestBody @Valid UserRequest user, BindingResult result){
		verifyInvalidParam(result);
		return userService.register(user);
	}
	
}
