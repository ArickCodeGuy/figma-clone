package com.example.backend.Entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// id, created_at, updated_at come from BaseEntity.
// @Data is not used on JPA entities: its equals/hashCode/toString walk the
// user <-> sketches relation in both directions and recurse forever.
@Entity
@Table(name = "UserEntity")
@Getter
@Setter
public class UserEntity extends BaseEntity {
  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  // Deleting a user deletes their sketches. Read-only side of the relation:
  // the owner is set on SketchEntity.user, which holds the user_id column
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<SketchEntity> sketches = new ArrayList<>();

  protected UserEntity() {
  }

  public UserEntity(String username, String password) {
    this.username = username;
    this.password = password;
  }
}
