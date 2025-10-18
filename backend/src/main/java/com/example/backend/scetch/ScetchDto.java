package com.example.backend.scetch;

public class ScetchDto {
  public Long id;
  public String name;
  public String description;
  public String content;

  public ScetchDto() {
  }

  public ScetchDto(Scetch scetch) {
    this.id = scetch.getId();
    this.content = scetch.getContent();
    this.name = scetch.getName();
    this.description = scetch.getDescription();
  }
}
