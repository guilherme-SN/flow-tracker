package com.guilherme.flowtracker.dto;

public class UserSettings {
    private Float breakTimeMultiplier;

    public UserSettings() {
        this.breakTimeMultiplier = 0.2f;
    }

    public UserSettings(float breakTimeMultiplier) {
        this.breakTimeMultiplier = breakTimeMultiplier;
    }

	public float getBreakTimeMultiplier() {
		return breakTimeMultiplier;
	}

	public void setBreakTimeMultiplier(float breakTimeMultiplier) {
		this.breakTimeMultiplier = breakTimeMultiplier;
	}
}
