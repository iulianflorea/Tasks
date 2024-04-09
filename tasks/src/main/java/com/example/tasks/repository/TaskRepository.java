package com.example.tasks.repository;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserFirstnameOrToDo(String user, String toDo);


}
