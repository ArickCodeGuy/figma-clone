package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	// http://localhost:5137/swagger-ui.html
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(BackendApplication.class);

		app.run(args);
	}
}
