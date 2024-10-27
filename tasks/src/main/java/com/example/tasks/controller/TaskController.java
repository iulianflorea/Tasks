package com.example.tasks.controller;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Task;
import com.example.tasks.service.TaskService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/findById/{id}")
    public TaskDto findById(@PathVariable Long id) {
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

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TaskDto>> search(@RequestParam String keyword) {
        List<TaskDto> taskDtoList = taskService.search(keyword);
        return new ResponseEntity<>(taskDtoList, HttpStatus.OK);
    }
    @GetMapping("/userTasks/{token}")
    public List<TaskDto> getTasksLoggedUser(@PathVariable String token) {
        return taskService.getTasksLoggedUser(token);
    }


}
