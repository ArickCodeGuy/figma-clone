package com.example.backend.scetch;

public class ScetchDto {
  public Long id;
  public Long owner_id;
  public String name;
  public String description;

  public ScetchDto() {}
  public ScetchDto(Scetch scetch) {
    this.id = scetch.getId();
    this.owner_id = scetch.getOwnerId();
    this.name = scetch.getName();
    this.description = scetch.getDescription();
  }
}
