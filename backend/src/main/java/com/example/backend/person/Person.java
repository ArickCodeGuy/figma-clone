package com.example.backend.person;

import java.util.HashSet;
import java.util.Set;

import com.example.backend.personScetch.PersonScetch;
import com.example.backend.scetch.Scetch;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Person {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;
  public String name;
  public String email;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<PersonScetch> userScetches = new HashSet<>();

  @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Scetch> scetches = new HashSet<>();

  public Person() {};
  public Person(
    String name,
    String email
  ) {
    this.name = name;
    this.email = email;
  }

  public Long getId() {
    return this.id;
  }
}
