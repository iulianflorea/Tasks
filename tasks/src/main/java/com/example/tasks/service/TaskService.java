package com.example.tasks.service;


import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Task;

import java.util.List;

public interface TaskService {

    TaskDto create(TaskDto taskDto);

    List<TaskDto> findAll();

    TaskDto findById(Long id);

    TaskDto update(TaskDto taskDto);

    void delete(Long id);

    List<TaskDto> search(String keyword);

    List<TaskDto> getTasksLoggedUser(String jwtToken);
}
