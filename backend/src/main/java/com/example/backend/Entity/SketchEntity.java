package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// id, created_at, updated_at come from BaseEntity.
@Entity
@Table(name = "Sketch")
@Getter
@Setter
public class SketchEntity extends BaseEntity {
    @Column(nullable = false)
    private String title;

    private String description;

    // Sketch JSON from the frontend. TEXT, because the default VARCHAR(255) is too short
    @Column(columnDefinition = "TEXT")
    private String content;

    // Owner. LAZY: listing sketches does not need to load the user row
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    // For JPA, which creates entities through a no-argument constructor
    protected SketchEntity() {
    }

    public SketchEntity(UserEntity user, String title, String description, String content) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.content = content;
    }
}
