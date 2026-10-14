package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.sketch.Sketch;
import com.example.backend.sketch.SketchRepository;

@Configuration
public class StartupDataLoader {
    @Bean
    public CommandLineRunner addTestData(SketchRepository sketchRepository) {
        return args -> {
            Sketch testSketch = new Sketch()
                    .setName("Test sketch")
                    .setDescription("Test sketch description");
            Sketch testSketch2 = new Sketch()
                    .setName("Test sketch 2")
                    .setDescription("Test sketch description 2");

            if (sketchRepository.count() == 0) {
                sketchRepository.save(testSketch);
                sketchRepository.save(testSketch2);
            }
        };
    }
}