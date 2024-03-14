package com.example.tasks.mapper;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Task;
import com.example.tasks.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskMapper {

    public Task toEntity(TaskDto taskDto) {
        return Task.builder()
                .userId(taskDto.getUserId())
                .toDo(taskDto.getToDo())
                .beginDate(taskDto.getBeginDate())
                .completedDate(taskDto.getCompletedDate())
                .build();
    }

    public TaskDto toDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .beginDate(task.getBeginDate())
                .completedDate(task.getCompletedDate())
                .userId(task.getUserId())
                .username(getUsername(task))
                .toDo(task.getToDo())
                .build();
    }

    private String getUsername(Task task) {
        User user = task.getUser();
        return (user != null) ? user.getUsername() : null;
    }

    public List<TaskDto> toDtoList(List<Task> taskList) {
        List<TaskDto> taskDtoList = new ArrayList<>();
        for (Task task : taskList) {
            TaskDto taskDto = toDto(task);
            taskDtoList.add(taskDto);
        }
        return taskDtoList;
    }
}
