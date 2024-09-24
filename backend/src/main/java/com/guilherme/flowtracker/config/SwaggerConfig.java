package com.guilherme.flowtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
        .info(new Info()
            .title("FlowTracker API")
            .version("0.0.1-SNAPSHOT")
            .description("Documentation for FlowTracker API"));
    }
}
