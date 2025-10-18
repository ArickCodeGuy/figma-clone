package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.scetch.Scetch;
import com.example.backend.scetch.ScetchRepository;

@Configuration
public class StartupDataLoader {
    @Bean
    public CommandLineRunner addTestData(ScetchRepository scetchRepository) {
        return args -> {
            Scetch testScetch = new Scetch("Test scetch", "Test scetch description");
            Scetch testScetch2 = new Scetch("Test scetch 2", "Test scetch description 2");

            if (scetchRepository.count() == 0) {
                scetchRepository.save(testScetch);
                scetchRepository.save(testScetch2);
            }
        };
    }
}