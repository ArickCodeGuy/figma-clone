package com.example.backend.Dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Sketch in a list, without content */
public record SketchDto(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) Long id,
    String title,
    String description) {
}
