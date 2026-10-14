package com.example.backend.sketch;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/sketches")
public class SketchController {
  @Autowired
  private SketchRepository sketchRepository;

  @Operation(summary = "Get list of sketches")
  @GetMapping
  @ResponseBody
  private ResponseEntity<List<SketchDto>> getSketches() {
    List<SketchDto> res = sketchRepository
        .findAll()
        .stream()
        .map(i -> Sketch.toDto(i))
        .collect(Collectors.toList());

    return ResponseEntity.ok(res);
  }

  @Operation(summary = "Get sketch by id")
  @GetMapping("/{id}")
  private ResponseEntity<Sketch> getSketchById(@PathVariable Long id) {
    Optional<Sketch> optionalSketch = sketchRepository.findById(id);

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(optionalSketch.get());
  }

  @Operation(summary = "Create sketch")
  @PostMapping("/create")
  public Sketch createSketch(@RequestBody SketchDto sketchDto) {
    Sketch sketch = new Sketch()
        .setName(sketchDto.name)
        .setDescription(sketchDto.description)
        .setContent(sketchDto.content);

    return sketchRepository.save(sketch);
  }

  @Operation(summary = "Update sketch by id")
  @PutMapping("/update")
  public ResponseEntity<Sketch> updateSketch(@RequestBody SketchDto sketchDto) {
    if (sketchDto.id == null) {
      return ResponseEntity.notFound().build();
    }

    Optional<Sketch> optionalSketch = sketchRepository.findById(sketchDto.id);

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Sketch sketch = optionalSketch.get();

    sketch
        .setName(sketchDto.name)
        .setDescription(sketchDto.description)
        .setContent(sketchDto.content);

    return ResponseEntity.ok(sketchRepository.save(sketch));
  }

  @Operation(summary = "Delete sketch by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteSketch(@PathVariable Long id) {
    Optional<Sketch> optionalSketch = sketchRepository.findById(id);

    if (optionalSketch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    sketchRepository.delete(optionalSketch.get());

    return ResponseEntity.ok(true);
  }
}
