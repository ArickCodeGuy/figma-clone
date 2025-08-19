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

import com.example.backend.personScetch.PersonScetchRepository;
import com.example.backend.scetchContent.ScetchContent;
import com.example.backend.scetchContent.ScetchContentRepository;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/scetches")
public class ScetchController {
  @Autowired
  private PersonScetchRepository personScetchRepository;
  @Autowired
  private ScetchRepository scetchRepository;
  @Autowired
  private ScetchContentRepository scetchContentRepository;

  @Operation(summary = "Get list of scetches allowed for view by user")
  @GetMapping
  @ResponseBody
  private ResponseEntity<List<ScetchDto>> getScetches() {
    // @@TODO
    Long user_id = (long) 1;
    
    List<Long> scetchIdList = personScetchRepository
      .findAllByPersonId(user_id)
      .stream()
      .map(i -> i.getId())
      .collect(Collectors.toList());

    List<ScetchDto> res = scetchRepository
      .findAllById(scetchIdList)
      .stream()
      .map(i -> new ScetchDto(i))
      .collect(Collectors.toList());
      
    return ResponseEntity.ok(res);
  }

  @GetMapping("/{id}")
  private ResponseEntity<String> getScetchValueById(@PathVariable Long id) {
    Optional<ScetchContent> sc = scetchContentRepository.findById(id);

    if (sc.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(sc.get().getValue());
  }
}
