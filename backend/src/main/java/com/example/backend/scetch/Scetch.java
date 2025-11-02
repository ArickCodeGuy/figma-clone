package com.example.backend.scetch;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Scetch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String content;

    public static ScetchDto toDto(Scetch scetch) {
        ScetchDto scetchDto = new ScetchDto();

        scetchDto.id = scetch.getId();
        scetchDto.name = scetch.getName();
        scetchDto.content = scetch.getContent();
        scetchDto.description = scetch.getDescription();

        return scetchDto;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public String getContent() {
        return this.content;
    }

    public Scetch setName(String name) {
        this.name = name;
        return this;
    }

    public Scetch setDescription(String description) {
        this.description = description;
        return this;
    }

    public Scetch setContent(String content) {
        this.content = content;
        return this;
    }
}
