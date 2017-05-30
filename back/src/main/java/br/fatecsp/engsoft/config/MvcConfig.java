package br.fatecsp.engsoft.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import br.fatecsp.engsoft.interceptors.ApiInterceptor;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

	@Value("${detetive.image.map}")
	private String filePath;

	@Autowired
	private ApiInterceptor apiInterceptor;

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/login").setViewName("login");
		registry.addViewController("/themes").setViewName("themes");
		registry.addViewController("/novoTema").setViewName("novoTema");
		registry.addViewController("/editTheme").setViewName("editTheme");
		registry.addViewController("/deck").setViewName("deck");
		registry.addViewController("/novaCarta").setViewName("novaCarta");
		registry.addViewController("/editarCarta").setViewName("editarCarta");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/files/**").addResourceLocations("file:///" + filePath);
		registry.addResourceHandler("/resource/**").addResourceLocations("/resources/css");
		registry.addResourceHandler("/resource/**").addResourceLocations("/resources/javascript");
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(apiInterceptor).addPathPatterns("/api/**").excludePathPatterns("/api/login","/api/register");
	}

}
