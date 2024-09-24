package com.guilherme.flowtracker.dto;

public class UserSettingsDto {
    private Float breakTimeMultiplier;

    public UserSettingsDto() {
        this.breakTimeMultiplier = 0.2f;
    }

    public UserSettingsDto(float breakTimeMultiplier) {
        this.breakTimeMultiplier = breakTimeMultiplier;
    }

	public float getBreakTimeMultiplier() {
		return breakTimeMultiplier;
	}

	public void setBreakTimeMultiplier(float breakTimeMultiplier) {
		this.breakTimeMultiplier = breakTimeMultiplier;
	}
}
