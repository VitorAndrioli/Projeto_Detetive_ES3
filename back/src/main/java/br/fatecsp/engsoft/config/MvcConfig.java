package br.fatecsp.engsoft.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {
	
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
    
}
