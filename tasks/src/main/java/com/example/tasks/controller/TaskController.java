package com.example.tasks.controller;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.service.TaskService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/create")
    public TaskDto create(@RequestBody TaskDto taskDto) {
        return taskService.create(taskDto);
    }

    @GetMapping("/findById")
    public TaskDto findById(@RequestParam Long id) {
        return taskService.findById(id);
    }

    @GetMapping("/findAll")
    public List<TaskDto> findAll() {
       return taskService.findAll();
    }

    @PutMapping("/update")
    public TaskDto update(@RequestBody TaskDto taskDto) {
        return taskService.update(taskDto);
    }

    @DeleteMapping("/deleteById")
    public void delete(@RequestParam Long id) {
        taskService.delete(id);
    }


}
