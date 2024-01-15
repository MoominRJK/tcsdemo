package com.example.EMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class JobApplication {

	public static void main(String[] args) {

		ApplicationContext run = SpringApplication.run(JobApplication.class, args);
	}
}
