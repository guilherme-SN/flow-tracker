package com.guilherme.flowtracker.controller;

import com.guilherme.flowtracker.dto.TimerStatus;
import com.guilherme.flowtracker.service.TimerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timer")
@CrossOrigin(origins = "http://localhost:3000")
public class TimerController {
    private final TimerService timerService;

    public TimerController(TimerService timerService) {
        this.timerService = timerService;
    }

    @PostMapping("/start")
    public ResponseEntity<String> startTimer() {
        timerService.start();
        return ResponseEntity.ok("Timer Started");
    }

    @PostMapping("/pause")
    public ResponseEntity<String> pauseTimer() {
        timerService.pause();
        return ResponseEntity.ok("Timer Paused");
    }

    @PostMapping("/stop")
    public ResponseEntity<String> stopTimer() {
        timerService.stop();
        return ResponseEntity.ok("Timer Stopped");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetTimer() {
        timerService.reset();
        return ResponseEntity.ok("Timer reset");
    }

    @GetMapping("/status")
    public ResponseEntity<TimerStatus> getTimerStatus() {
        return ResponseEntity.ok(timerService.getStatus());
    }
}

