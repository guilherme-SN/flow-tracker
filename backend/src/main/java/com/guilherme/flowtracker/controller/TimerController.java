package com.guilherme.flowtracker.controller;

import jakarta.servlet.http.HttpSession;

import com.guilherme.flowtracker.service.TimerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/timer")
@Tag(name = "Timer Controller", description = "Operations related to the timer")
public class TimerController {
    private final TimerService timerService;

    public TimerController(TimerService timerService) {
        this.timerService = timerService;
    }

    @Operation(summary = "Calculate break time")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved the break time")
    })
    @PostMapping("calculate-break-time")
    public ResponseEntity<Integer> getBreakTime(@RequestParam("focusTime") Integer focusTime, HttpSession session) {
        Float multiplier = (Float) session.getAttribute("breakTimeMultiplier");
        if (multiplier == null) multiplier = 0.2f;

        return ResponseEntity.ok(timerService.calculateBreakTime(focusTime, multiplier));
    }
}

