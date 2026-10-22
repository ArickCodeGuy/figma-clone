package com.example.backend.Dto;

/** Request of create. No id: the database generates it, see SketchFullDto in the response */
public record SketchCreateDto(String title, String description, String content) {
}
