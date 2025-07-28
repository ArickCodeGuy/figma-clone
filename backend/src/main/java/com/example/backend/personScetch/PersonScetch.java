package com.example.backend.personScetch;

import com.example.backend.person.Person;
import com.example.backend.scetch.Scetch;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PersonScetch {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private Person user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "scetch_id", referencedColumnName = "id")
  private Scetch scetch;

  public PersonScetch() {};
  public PersonScetch(Person user, Scetch scetch) {
    this.user = user;
    this.scetch = scetch;
  };
}
