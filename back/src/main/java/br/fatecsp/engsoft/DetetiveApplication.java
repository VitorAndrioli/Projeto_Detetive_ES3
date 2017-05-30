package br.fatecsp.engsoft;

import static springfox.documentation.builders.PathSelectors.regex;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class DetetiveApplication {

	@Value("${version}")
	private String version;

	public static void main(String[] args) {
		SpringApplication.run(DetetiveApplication.class, args);
	}

	@Bean
	public Docket newsApi() {
		List<ApiKey> apiKey = new ArrayList<ApiKey>();
		apiKey.add(apiKey());
		return new Docket(DocumentationType.SWAGGER_2).groupName("Detetive").securitySchemes(apiKey).apiInfo(apiInfo()).select()
				.paths(regex("/api.*")).build();
	}
	
	@Bean
	public SecurityConfiguration securitySwagger() {
		return new SecurityConfiguration("client-id", "client-secret", "realm", "DETETIVE", "token", ApiKeyVehicle.HEADER,
				"token", ",");
	}
	
	private ApiKey apiKey() {
		return new ApiKey("token", "token", "header");
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Detetive backend")
				.description("Api responsavel por gerenciar as informações do game")
				.license("Apache License Version 2.0").licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
				.version(version).build();
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
