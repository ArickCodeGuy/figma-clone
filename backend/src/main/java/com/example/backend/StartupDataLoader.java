package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.backend.person.Person;
import com.example.backend.person.PersonRepository;
import com.example.backend.personScetch.PersonScetch;
import com.example.backend.personScetch.PersonScetchRepository;
import com.example.backend.scetch.Scetch;
import com.example.backend.scetch.ScetchRepository;

@Configuration
public class StartupDataLoader {
    @Bean
    public CommandLineRunner addTestData(PersonRepository personRepository, ScetchRepository scetchRepository, PersonScetchRepository personScetchRepository) {
        return args -> {
            Person testUser = new Person("TestUser", "test@mail.com");
            Scetch testScetch = new Scetch("Test scetch", "Test scetch description", testUser);
            Scetch testScetch2 = new Scetch("Test scetch 2", "Test scetch description 2", testUser);
            PersonScetch userScetch = new PersonScetch(testUser, testScetch); 
            PersonScetch userScetch2 = new PersonScetch(testUser, testScetch2); 

            if (personRepository.count() == 0) {
                personRepository.save(testUser);
            }

            if (scetchRepository.count() == 0) {
                scetchRepository.save(testScetch);
                scetchRepository.save(testScetch2);
            }

            if (personScetchRepository.count() == 0) {
              personScetchRepository.save(userScetch);
              personScetchRepository.save(userScetch2);
            }
        };
    }
}