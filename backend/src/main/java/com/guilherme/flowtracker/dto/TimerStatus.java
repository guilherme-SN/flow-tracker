package com.guilherme.flowtracker.dto;

public class TimerStatus {
    private long time;
    private boolean isRunning;

    public TimerStatus(boolean isRunning, long time) {
        this.time = time;
        this.isRunning = isRunning;
    }

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public boolean isRunning() {
		return isRunning;
	}

	public void setRunning(boolean isRunning) {
		this.isRunning = isRunning;
	}
}
