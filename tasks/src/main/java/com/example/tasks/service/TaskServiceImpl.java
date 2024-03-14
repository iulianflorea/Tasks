package com.example.tasks.service;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Task;
import com.example.tasks.mapper.TaskMapper;
import com.example.tasks.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskDto create(TaskDto taskDto) {
        Task taskToBeSaved = Task.builder()
                .userId(taskDto.getUserId())
                .toDo(taskDto.getToDo())
                .beginDate(taskDto.getBeginDate())
                .completedDate(taskDto.getCompletedDate())
                .status(taskDto.getStatus())
                .build();
        Task taskSaved = taskRepository.save(taskToBeSaved);
        return taskMapper.toDto(taskSaved);
    }
@Override
    public List<TaskDto> findAll() {
        List<Task> taskList = taskRepository.findAll();
        return taskMapper.toDtoList(taskList);
    }
    @Override
    public TaskDto findById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        return taskMapper.toDto(task);
    }
    @Override
    public TaskDto update(TaskDto taskDto) {
        Task taskToBeUpdated = Task.builder()
                .userId(taskDto.getUserId())
                .toDo(taskDto.getToDo())
                .beginDate(taskDto.getBeginDate())
                .completedDate(taskDto.getCompletedDate())
                .status(taskDto.getStatus())
                .build();
        Task updatedTask = taskRepository.save(taskToBeUpdated);
        return taskMapper.toDto(updatedTask);
    }
    @Override
    public void delete(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        taskRepository.delete(task);
    }

}
