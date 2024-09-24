package com.guilherme.flowtracker.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.guilherme.flowtracker.dto.TaskDto;
import com.guilherme.flowtracker.model.Task;
import com.guilherme.flowtracker.repository.TaskRepository;

import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String taskId) {
        return taskRepository.findById(UUID.fromString(taskId));
    }

    public UUID createTask(TaskDto taskDto) {
        Task task = taskDto.toTask();

        return taskRepository.save(task).getId();
    }
}
