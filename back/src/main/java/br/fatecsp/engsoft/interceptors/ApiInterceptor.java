package br.fatecsp.engsoft.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import br.fatecsp.engsoft.api.exceptions.UnauthorizedClientException;
import br.fatecsp.engsoft.entities.User;
import br.fatecsp.engsoft.repositories.UserRepository;

@Component
public class ApiInterceptor extends HandlerInterceptorAdapter{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	
		String token = request.getHeader("token");
		if(token == null){
			throw new UnauthorizedClientException("Usuario não autenticado");
		}
		
		User userByToken = userRepository.findUserByToken(token);
		
		if(userByToken == null){
			throw new UnauthorizedClientException("Usuario não autenticado");
		}
		
		return true;
	}
	
}