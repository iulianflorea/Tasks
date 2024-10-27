package com.example.tasks.repository;

import com.example.tasks.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE " +
            "LOWER(t.toDo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.status) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.user.firstname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "(:beginDate IS NOT NULL AND t.beginDate = :beginDate) OR " +
            "(:completedDate IS NOT NULL AND t.completedDate = :completedDate)")
    List<Task> searchTasks(@Param("keyword") String keyword,
                           @Param("beginDate") LocalDate beginDate,
                           @Param("completedDate") LocalDate completedDate);
}

