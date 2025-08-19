package com.example.backend.scetch;

import com.example.backend.person.Person;
import com.example.backend.scetchContent.ScetchContent;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Scetch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @JsonIgnore
    private Person owner;

    @OneToOne
    @JsonIgnore
    private ScetchContent scetchContent;

    public Scetch() {}
    public Scetch(
        String name,
        String description,
        Person owner
    ) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        // @@TODO Need to create scetch empty value on scetch create
        // this.scetchContent = new ScetchContent();
    }

    public Long getId() {
        return this.id;
    }

    public Long getOwnerId() {
        return this.owner.getId();
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }
}
