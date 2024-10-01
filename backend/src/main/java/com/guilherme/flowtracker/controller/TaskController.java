package com.guilherme.flowtracker.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.validation.Valid;

import com.guilherme.flowtracker.dto.TaskDto;
import com.guilherme.flowtracker.model.Task;
import com.guilherme.flowtracker.service.TaskService;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task Controller", description = "Operations related to the tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Get all tasks")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved all tasks",
            content = @Content(schema = @Schema(implementation = Task.class)))
    })
    @GetMapping
    public ResponseEntity<List<Task>> listTasks() {
        List<Task> tasks = taskService.listTasks();

        tasks.sort((t1, t2) -> t1.getCreatedAt().compareTo(t2.getCreatedAt()));

        return ResponseEntity.ok(tasks);
    }

    @Operation(summary = "Get task by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the tasks",
            content = @Content(schema = @Schema(implementation = Task.class))),
        @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable("taskId") String taskId) {
        Optional<Task> taskOptional = taskService.getTaskById(taskId);

        if (taskOptional.isPresent()) {
            return ResponseEntity.ok(taskOptional.get());
        }

        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Create a task")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Successfully created the task"),
        @ApiResponse(responseCode = "400", description = "Invalid input provided")
    }) 
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody @Valid TaskDto taskDto, BindingResult result) {
        if (result.hasErrors()) return ResponseEntity.badRequest().build();

        UUID taskId = taskService.createTask(taskDto);

        return ResponseEntity.created(URI.create("/api/tasks/" + taskId.toString())).build();
    }

    @Operation(summary = "Update a task")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully updated the task",
            content = @Content(schema = @Schema(implementation = Task.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input provided"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    }) 
    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTaskByIdById(@PathVariable("taskId") String taskId, @RequestBody @Valid TaskDto taskDto, BindingResult result) {
        if (result.hasErrors()) return ResponseEntity.badRequest().build();

        Task updatedTask = taskService.updateTaskById(taskId, taskDto);

        if (updatedTask == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(updatedTask);
    }

    @Operation(summary = "Delete all tasks")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Successfully deleted all tasks")
    }) 
    @DeleteMapping
    public ResponseEntity<Void> deleteAllTasks() {
        taskService.deleteAllTasks();

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete a task")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Successfully deleted the task"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    }) 
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable("taskId") String taskId) {

        boolean taskDeleted = taskService.deleteTaskById(taskId);

        if (taskDeleted) return ResponseEntity.noContent().build();

        return ResponseEntity.notFound().build();
    }
}

