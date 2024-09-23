package com.guilherme.flowtracker.config;

import jakarta.annotation.PostConstruct;

import org.springframework.context.annotation.Configuration;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class DotEnvConfig {
    @PostConstruct
    public void loadEnv() {
        Dotenv dotenv = Dotenv.load();

        System.setProperty("PROD_DB_HOST", dotenv.get("PROD_DB_HOST"));
        System.setProperty("PROD_DB_PORT", dotenv.get("PROD_DB_PORT"));
        System.setProperty("PROD_DB_NAME", dotenv.get("PROD_DB_NAME"));
        System.setProperty("PROD_DB_USERNAME", dotenv.get("PROD_DB_USERNAME"));
        System.setProperty("PROD_DB_PASSWORD", dotenv.get("PROD_DB_PASSWORD"));
    }
}
