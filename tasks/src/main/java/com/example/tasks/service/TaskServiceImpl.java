package com.example.tasks.service;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Status;
import com.example.tasks.entity.Task;
import com.example.tasks.mapper.TaskMapper;
import com.example.tasks.repository.TaskRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    @PersistenceContext
    private EntityManager entityManager;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskDto create(TaskDto taskDto) {
        Task taskToBeSaved = taskMapper.toEntity(taskDto);
        if (taskDto.getId() == null) {
            Task taskSaved = taskRepository.save(taskToBeSaved);
            return taskMapper.toDto(taskSaved);
        } else {
            update(taskDto);
        }
        return taskMapper.toDto(taskToBeSaved);
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
        Task taskToBeUpdated = taskRepository.findById(taskDto.getId()).orElseThrow();
        taskToBeUpdated.setStatus(taskDto.getStatus());
        taskToBeUpdated.setToDo(taskDto.getToDo());
        taskToBeUpdated.setUserId(taskDto.getUserId());
        taskToBeUpdated.setBeginDate(taskDto.getBeginDate());
        taskToBeUpdated.setCompletedDate(taskDto.getCompletedDate());
        Task updatedTask = taskRepository.save(taskToBeUpdated);
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public void delete(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        taskRepository.delete(task);
    }

    @Override
    public List<TaskDto> search(String keyword) {

        LocalDate beginDate = null;
        LocalDate completedDate = null;

        // Încearcă să parsezi keyword ca LocalDate
        try {
            beginDate = LocalDate.parse(keyword);
            completedDate = beginDate;
        } catch (DateTimeParseException e) {
            // Dacă nu poate fi convertit în LocalDate, lăsăm valorile ca null
        }

        List<Task> taskList = taskRepository.searchTasks(keyword, beginDate, completedDate);
        return taskMapper.toDtoList(taskList);
    }


    @Override
    public List<TaskDto> getTasksLoggedUser(String jwtToken) {
        String userId = parseJWT(jwtToken);
        List<Task> allTasks = taskRepository.findAll();
        List<Task> userTasks = new ArrayList<>();
        for (Task task : allTasks) {
            if (task.getUser().getUsername().equals(userId)) {
                userTasks.add(task);
            }
        }
        return taskMapper.toDtoList(userTasks);
    }

    private String parseJWT(String jwtToken) {
        String secretKey = "MzBxJaeWRwNubD+ZS4/zVgK9GPqH8A3Nns2gXmPvMUfAsqtsowARlphR8Z4FwYoKPDl0Sk/ahgauCJGu7bGz4Q==";
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwtToken)
                    .getBody();
            String userId = claims.getSubject();
            return userId;
        } catch (Exception e) {
            return null;
        }
    }

}
