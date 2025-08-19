package com.example.backend.scetchContent;

import com.example.backend.scetch.Scetch;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class ScetchContent {
    @Id
    private Long id;

    @OneToOne @MapsId
    private Scetch scetch;

    private String value;

    public ScetchContent() {}

    public String getValue() { return this.value; }
}
