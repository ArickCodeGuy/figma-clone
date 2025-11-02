package com.example.backend.scetch;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    Optional<Scetch> scetch = scetchRepository.findById(id);

    if (scetch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(scetch.get());
  }

  @Operation(summary = "Create scetch")
  @PostMapping("/create")
  public Scetch createScetch(@RequestBody String name,
      @RequestBody String description) {
    Scetch scetch = new Scetch(name, description);

    return scetchRepository.save(scetch);
  }

  @Operation(summary = "Update scetch by id")
  @PutMapping("/update")
  public ResponseEntity<Scetch> updateScetch(@RequestBody ScetchDto scetchJSON) {
    Optional<Scetch> optionalScetch = scetchRepository.findById(scetchJSON.id);

    if (optionalScetch.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Scetch scetch = optionalScetch.get();

    scetch.setName(scetchJSON.name);
    scetch.setDescription(scetchJSON.description);
    scetch.setContent(scetchJSON.content);

    return ResponseEntity.ok(scetchRepository.save(scetch));
  }
}
