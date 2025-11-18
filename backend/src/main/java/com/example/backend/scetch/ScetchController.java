package com.example.backend.scetch;

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
@RequestMapping("/api/v1/scetches")
public class ScetchController {
  @Autowired
  private ScetchRepository scetchRepository;

  @Operation(summary = "Get list of scetches")
  @GetMapping
  @ResponseBody
  private ResponseEntity<List<ScetchDto>> getScetches() {
    List<ScetchDto> res = scetchRepository
        .findAll()
        .stream()
        .map(i -> Scetch.toDto(i))
        .collect(Collectors.toList());

    return ResponseEntity.ok(res);
  }

  @Operation(summary = "Get scetch by id")
  @GetMapping("/{id}")
  private ResponseEntity<Scetch> getScetchById(@PathVariable Long id) {
    Optional<Scetch> optionalScetch = scetchRepository.findById(id);

    if (optionalScetch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(optionalScetch.get());
  }

  @Operation(summary = "Create scetch")
  @PostMapping("/create")
  public Scetch createScetch(@RequestBody ScetchDto scetchDto) {
    Scetch scetch = new Scetch()
        .setName(scetchDto.name)
        .setDescription(scetchDto.description)
        .setContent(scetchDto.content);

    return scetchRepository.save(scetch);
  }

  @Operation(summary = "Update scetch by id")
  @PutMapping("/update")
  public ResponseEntity<Scetch> updateScetch(@RequestBody ScetchDto scetchDto) {
    if (scetchDto.id == null) {
      return ResponseEntity.notFound().build();
    }

    Optional<Scetch> optionalScetch = scetchRepository.findById(scetchDto.id);

    if (optionalScetch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Scetch scetch = optionalScetch.get();

    scetch
        .setName(scetchDto.name)
        .setDescription(scetchDto.description)
        .setContent(scetchDto.content);

    return ResponseEntity.ok(scetchRepository.save(scetch));
  }

  @Operation(summary = "Delete scetch by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteScetch(@PathVariable Long id) {
    Optional<Scetch> optionalScetch = scetchRepository.findById(id);

    if (optionalScetch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    scetchRepository.delete(optionalScetch.get());

    return ResponseEntity.ok(true);
  }
}
