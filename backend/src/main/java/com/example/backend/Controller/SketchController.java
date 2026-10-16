package com.example.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Dto.SketchFullDto;
import com.example.backend.Entity.SketchEntity;
import com.example.backend.Repository.SketchRepository;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/sketches")
public class SketchController {
  private SketchRepository sketchRepository;

  public SketchController(SketchRepository sketchRepository) {
    this.sketchRepository = sketchRepository;
  }

  @Operation(summary = "Get list of sketches")
  @GetMapping
  @ResponseBody
  private ResponseEntity<List<SketchFullDto>> getSketches() {
    // @@TODO return all sketches that belong to UserEntity
    // Use AuthUser from config

    return ResponseEntity.ok(null);
  }

  @Operation(summary = "Get sketch by id")
  @GetMapping("/{id}")
  private ResponseEntity<SketchEntity> getSketchById(@PathVariable @NonNull Long id) {
    Optional<SketchEntity> optionalSketch = sketchRepository.findById(id);

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(optionalSketch.get());
  }

  @Operation(summary = "Create sketch")
  @PostMapping("/create")
  public SketchEntity createSketch(@RequestBody SketchFullDto sketchDto) {
    SketchEntity sketch = new SketchEntity();
    sketch.setTitle(sketchDto.title());
    sketch.setDescription(sketchDto.description());
    sketch.setContent(sketchDto.content());

    return sketchRepository.save(sketch);
  }

  @Operation(summary = "Update sketch by id")
  @PutMapping("/update")
  public ResponseEntity<SketchEntity> updateSketch(@RequestBody SketchFullDto sketchDto) {
    if (sketchDto.id() == null) {
      return ResponseEntity.notFound().build();
    }

    // Validate that sketch belongs to user
    Optional<SketchEntity> optionalSketch = sketchRepository.findById(sketchDto.id());

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    SketchEntity sketch = optionalSketch.get();

    sketch.setTitle(sketchDto.title());
    sketch.setDescription(sketchDto.description());
    sketch.setContent(sketchDto.content());

    return ResponseEntity.ok(sketchRepository.save(sketch));
  }

  @Operation(summary = "Delete sketch by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteSketch(@PathVariable Long id) {
    // Validate that sketch belongs to user
    Optional<SketchEntity> optionalSketch = sketchRepository.findById(id);

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    sketchRepository.delete(optionalSketch.get());

    return ResponseEntity.ok(true);
  }
}
