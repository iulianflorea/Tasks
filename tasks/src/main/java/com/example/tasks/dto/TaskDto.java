package com.example.tasks.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TaskDto {

    private Long id;
    private String toDo;
    private String status;
    private String username;
    private String beginDate;
    private String completedDate;
}
