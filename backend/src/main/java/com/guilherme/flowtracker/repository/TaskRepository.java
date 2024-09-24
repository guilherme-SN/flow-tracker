package com.guilherme.flowtracker.repository;

import java.util.UUID;

import com.guilherme.flowtracker.model.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, UUID> { }
