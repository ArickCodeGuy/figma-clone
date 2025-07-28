package com.example.backend.personScetch;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonScetchRepository extends JpaRepository<PersonScetch, Long> {
  List<PersonScetch> findAllByUserId(Long user_id);
}