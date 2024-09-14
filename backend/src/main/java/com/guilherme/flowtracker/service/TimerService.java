package com.guilherme.flowtracker.service;

import java.time.Duration;
import java.time.Instant;

import com.guilherme.flowtracker.dto.TimerStatus;

import org.springframework.stereotype.Service;

@Service
public class TimerService {
    private Instant startTime;
    private Duration elapsedTime;
    private boolean isRunning;

    public TimerService() {
        this.elapsedTime = Duration.ZERO;
        this.isRunning = false; 
    }

    public synchronized void start() {
        if (!isRunning) {
            isRunning = true;
            startTime = Instant.now();
        }
    }

    public synchronized void pause() {
        if (isRunning) {
            isRunning = false;
            elapsedTime = elapsedTime.plus(Duration.between(startTime, Instant.now()));
        }
    }

    public synchronized void stop() {
        isRunning = false;
        elapsedTime = Duration.ZERO;
    }

    public synchronized void reset() {
        elapsedTime = Duration.ZERO;

        if (isRunning) {
            startTime = Instant.now();
            isRunning = false;
        }
    }

    public synchronized TimerStatus getStatus() {
        Duration currentElapsedTime = elapsedTime;

        if (isRunning) {
            currentElapsedTime = elapsedTime.plus(Duration.between(startTime, Instant.now()));
        }

        return new TimerStatus(isRunning, currentElapsedTime.getSeconds());
    }
}
