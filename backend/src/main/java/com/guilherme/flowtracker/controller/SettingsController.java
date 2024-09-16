package com.guilherme.flowtracker.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:3000")
public class SettingsController {
    @PostMapping("break-time-multiplier")
    public void setBreakTimeMultiplier(@RequestParam("multiplier") Float multiplier, HttpSession session) {
        session.setAttribute("breakTimeMultiplier", multiplier);
    }

    @GetMapping("break-time-multiplier")
    public Float getBreakTimeMultiplier(HttpSession session) {
        Float multiplier = (Float) session.getAttribute("breakTimeMultiplier");

        return (multiplier != null) ? multiplier : 0.2f;
    }
}

