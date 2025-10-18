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
        .map(i -> new ScetchDto(i))
        .collect(Collectors.toList());

    return ResponseEntity.ok(res);
  }

  @GetMapping("/{id}")
  private ResponseEntity<Scetch> getScetchValueById(@PathVariable Long id) {
    Optional<Scetch> sc = scetchRepository.findById(id);

    if (sc.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(sc.get());
  }

  @PostMapping("/new")
  public Scetch postMethodName(@RequestBody String name,
      @RequestBody String description) {
    Scetch scetch = new Scetch(name, description);

    return scetchRepository.save(scetch);
  }
}
