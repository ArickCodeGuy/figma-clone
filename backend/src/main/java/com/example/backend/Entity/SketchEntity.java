package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Sketch")
@Getter
@Setter
public class SketchEntity extends BaseEntity {
    private String title;
    private String description;
    private String content;

    // @@TODO add user_id key from UserEntity

    public SketchEntity() {
    }
}
