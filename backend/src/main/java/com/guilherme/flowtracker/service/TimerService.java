package com.guilherme.flowtracker.service;

import org.springframework.stereotype.Service;

@Service
public class TimerService {
    public int calculateBreakTime(Integer focusTime, Float breakTimeMultiplier) {
        return (int) Math.ceil(focusTime * breakTimeMultiplier);
    }
}

