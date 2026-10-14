package com.example.backend.sketch;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Sketch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String content;

    public static SketchDto toDto(Sketch sketch) {
        SketchDto sketchDto = new SketchDto();

        sketchDto.id = sketch.getId();
        sketchDto.name = sketch.getName();
        sketchDto.content = sketch.getContent();
        sketchDto.description = sketch.getDescription();

        return sketchDto;
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

    public Sketch setName(String name) {
        this.name = name;
        return this;
    }

    public Sketch setDescription(String description) {
        this.description = description;
        return this;
    }

    public Sketch setContent(String content) {
        this.content = content;
        return this;
    }
}
