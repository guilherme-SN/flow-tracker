package com.guilherme.flowtracker.dto;

import jakarta.validation.constraints.NotNull;

import com.guilherme.flowtracker.model.Task;

public class TaskDto {
    @NotNull
    private String description;
    @NotNull
    private Boolean isCompleted;

	public String getDescription() {
		return description;
	}

	public Boolean getIsCompleted() {
		return isCompleted;
	}

    public Task toTask() {
        return new Task(description, isCompleted);
    }
}
