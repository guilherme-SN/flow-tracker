package com.guilherme.flowtracker.controller;

import jakarta.servlet.http.HttpSession;

import com.guilherme.flowtracker.service.TimerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timer")
@CrossOrigin(origins = "http://localhost:3000")
public class TimerController {
    private final TimerService timerService;

    public TimerController(TimerService timerService) {
        this.timerService = timerService;
    }

    @PostMapping("calculate-break-time")
    public ResponseEntity<Integer> getBreakTime(@RequestParam("focusTime") Integer focusTime, HttpSession session) {
        Float multiplier = (Float) session.getAttribute("breakTimeMultiplier");
        if (multiplier == null) multiplier = 0.2f;

        return ResponseEntity.ok(timerService.calculateBreakTime(focusTime, multiplier));
    }
}

