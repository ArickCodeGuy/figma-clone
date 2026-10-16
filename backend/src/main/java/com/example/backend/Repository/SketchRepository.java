package com.example.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.SketchEntity;

public interface SketchRepository extends JpaRepository<SketchEntity, Long> {

  /** Sketches of one user, most recently changed first */
  List<SketchEntity> findAllByUserIdOrderByUpdatedAtDesc(Long userId);

  /** Empty when the sketch does not exist or belongs to another user */
  Optional<SketchEntity> findByIdAndUserId(Long id, Long userId);
}
