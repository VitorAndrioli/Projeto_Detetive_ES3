package br.fatecsp.engsoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DetetiveApplication {
	private DetetiveApplication() {}

	public static void main(String[] args) {
		SpringApplication.run(DetetiveApplication.class, args);
	}
}
