package com.example.backend.personScetch;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.backend.scetch.ScetchDto;
import com.example.backend.scetch.ScetchRepository;

import io.swagger.v3.oas.annotations.Operation;

@Controller
public class PersonScetchController {
  @Autowired
  private PersonScetchRepository personScetchRepository;
  @Autowired
  private ScetchRepository scetchRepository;

  @Operation(summary = "Get list of scetches allowed for view by user")
  @GetMapping("/api/v1/scetches")
  @ResponseBody
  public List<ScetchDto> getScetches() {
    // @@TODO
    Long user_id = (long) 1;

    List<Long> scetchIdList = personScetchRepository
      .findAllByUserId(user_id)
      .stream()
      .map(i -> i.id)
      .collect(Collectors.toList());

    return scetchRepository
      .findAllById(scetchIdList)
      .stream()
      .map(i -> new ScetchDto(i))
      .collect(Collectors.toList());
  }
}
