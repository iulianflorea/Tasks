package com.example.tasks.repository;

import com.example.tasks.dto.TaskDto;
import com.example.tasks.entity.Status;
import com.example.tasks.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByStatus(Status status);

    List<Task> findAllByUserFirstnameOrToDo(String username, String toDo);

    List<Task> findAllByBeginDateOrCompletedDate(LocalDate beginDate, LocalDate completedDate);

}
