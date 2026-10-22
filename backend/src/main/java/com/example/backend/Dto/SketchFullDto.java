package com.example.backend.Dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Sketch with content. Response of get/create/update, request of update */
public record SketchFullDto(
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED) Long id,
    String title,
    String description,
    String content) {
}
