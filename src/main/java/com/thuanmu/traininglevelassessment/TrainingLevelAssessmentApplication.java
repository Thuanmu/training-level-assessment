package com.thuanmu.traininglevelassessment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@EnableAutoConfiguration
public class TrainingLevelAssessmentApplication {
	
	@RequestMapping("/")
	String home() {
		return "Xin chao thuan";
	}

	public static void main(String[] args) {
		SpringApplication.run(TrainingLevelAssessmentApplication.class, args);
	}

}
