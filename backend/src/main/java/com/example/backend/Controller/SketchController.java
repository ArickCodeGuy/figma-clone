package com.example.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Config.AuthUser;
import com.example.backend.Dto.SketchCreateDto;
import com.example.backend.Dto.SketchDto;
import com.example.backend.Dto.SketchFullDto;
import com.example.backend.Entity.SketchEntity;
import com.example.backend.Entity.UserEntity;
import com.example.backend.Repository.SketchRepository;
import com.example.backend.Repository.UserRepository;

import io.swagger.v3.oas.annotations.Operation;

/**
 * Sketches of the logged-in user. Every endpoint requires a token (see
 * SecurityConfig),
 * so {@code user} is never null.
 *
 * A sketch of another user answers 404, same as a missing one,
 * so ids of other users' sketches cannot be probed.
 *
 * Responses are DTOs, never entities: SketchEntity.user would expose the
 * password hash.
 */
@RestController
@RequestMapping("/api/v1/sketches")
public class SketchController {
  private final SketchRepository sketchRepository;
  private final UserRepository userRepository;

  public SketchController(SketchRepository sketchRepository, UserRepository userRepository) {
    this.sketchRepository = sketchRepository;
    this.userRepository = userRepository;
  }

  @Operation(summary = "Get list of sketches of the logged-in user, without content")
  @GetMapping
  public ResponseEntity<List<SketchDto>> getSketches(@AuthenticationPrincipal AuthUser user) {
    List<SketchDto> res = sketchRepository
        .findAllByUserIdOrderByUpdatedAtDesc(user.id())
        .stream()
        .map(SketchController::toDto)
        .toList();

    return ResponseEntity.ok(res);
  }

  @Operation(summary = "Get sketch by id")
  @GetMapping("/{id}")
  public ResponseEntity<SketchFullDto> getSketchById(@AuthenticationPrincipal AuthUser user,
      @PathVariable Long id) {
    return sketchRepository.findByIdAndUserId(id, user.id())
        .map(sketch -> ResponseEntity.ok(toFullDto(sketch)))
        .orElse(ResponseEntity.notFound().build());
  }

  @Operation(summary = "Create sketch")
  @PostMapping("/create")
  public ResponseEntity<SketchFullDto> createSketch(@AuthenticationPrincipal AuthUser user,
      @RequestBody SketchCreateDto sketchDto) {
    if (sketchDto == null || !isValidTitle(sketchDto.title())) {
      return ResponseEntity.badRequest().build();
    }

    UserEntity owner = userRepository.getReferenceById(user.id());
    SketchEntity sketch = new SketchEntity(owner, sketchDto.title().trim(), sketchDto.description(),
        sketchDto.content());

    return ResponseEntity.ok(toFullDto(sketchRepository.save(sketch)));
  }

  @Operation(summary = "Update sketch by id")
  @PutMapping("/update")
  public ResponseEntity<SketchFullDto> updateSketch(@AuthenticationPrincipal AuthUser user,
      @RequestBody SketchFullDto sketchDto) {
    if (sketchDto == null || sketchDto.id() == null) {
      return ResponseEntity.notFound().build();
    }
    if (!isValidTitle(sketchDto.title())) {
      return ResponseEntity.badRequest().build();
    }

    return sketchRepository.findByIdAndUserId(sketchDto.id(), user.id())
        .map(sketch -> {
          sketch.setTitle(sketchDto.title().trim());
          sketch.setDescription(sketchDto.description());
          sketch.setContent(sketchDto.content());

          return ResponseEntity.ok(toFullDto(sketchRepository.save(sketch)));
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @Operation(summary = "Delete sketch by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteSketch(@AuthenticationPrincipal AuthUser user,
      @PathVariable Long id) {
    return sketchRepository.findByIdAndUserId(id, user.id())
        .map(sketch -> {
          sketchRepository.delete(sketch);
          return ResponseEntity.ok(true);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  private static boolean isValidTitle(String title) {
    return title != null && !title.isBlank();
  }

  private static SketchDto toDto(SketchEntity sketch) {
    return new SketchDto(sketch.getId(), sketch.getTitle(), sketch.getDescription());
  }

  private static SketchFullDto toFullDto(SketchEntity sketch) {
    return new SketchFullDto(sketch.getId(), sketch.getTitle(), sketch.getDescription(),
        sketch.getContent());
  }
}
