package com.example.tasks.service;

import com.example.tasks.dto.UserDto;

import java.util.List;

public interface UserService {


    List<UserDto> findAll();

    UserDto update(UserDto userDto);

    void delete(Long id);
}
