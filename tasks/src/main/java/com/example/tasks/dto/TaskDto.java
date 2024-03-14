package com.example.tasks.dto;

import com.example.tasks.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TaskDto {

    private Long id;
    private String toDo;
    private Status status;
    private Long userId;
    private String username;
    private LocalDate beginDate;
    private LocalDate completedDate;
}
