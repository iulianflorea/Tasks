package com.example.tasks.service;

import com.example.tasks.repository.TaskRepository;

public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

}
