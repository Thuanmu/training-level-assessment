package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.AthleteClassification;
import com.thuanmu.traininglevelassessment.repository.AthleteClassificationRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/athleteClassifications")
public class AthleteClassificationController {
	
	private final Logger log = LoggerFactory.getLogger(AthleteClassificationController.class);
	
	@Autowired
    private AthleteClassificationRepository athleteClassificationRepository;
		
	public AthleteClassificationController(AthleteClassificationRepository athleteClassificationRepository) {
		super();
		this.athleteClassificationRepository = athleteClassificationRepository;
	}

	// get all athleteClassifications
    @GetMapping
    public List<AthleteClassification> getAllAthleteClassifications() {
        return athleteClassificationRepository.findAll();
    }
    
    // get athleteClassifications by month and year
    @GetMapping("/{month}/{year}")
    public List<AthleteClassification> getRankingsByMonthAndYear(@PathVariable int month, @PathVariable int year) {
    	return athleteClassificationRepository.findByMonthAndYear(month, year);
    }
    
    // get athleteClassifications by last date of month
    @GetMapping("/lastDateOfMonth")
    public List<AthleteClassification> getAthleteClassificationByLastDateOfMonth() {
    	return athleteClassificationRepository.findByLastDateOfMonth();
    }
    
    // get athleteClassifications by athleteId and last date of month
    @GetMapping("/{athleteId}/lastDateOfMonth")
    public List<AthleteClassification> getAthleteClassificationByAthleteIdAndLastDateOfMonth(@PathVariable Long athleteId) {
    	return athleteClassificationRepository.findByAthleteIdAndLastDateOfMonth(athleteId);
    }
    
    // get athleteClassification by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getAthleteClassification(@PathVariable Long id) {
        Optional<AthleteClassification> athleteClassification = athleteClassificationRepository.findById(id);
        return athleteClassification.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create athleteClassification rest api
    @PostMapping
    ResponseEntity<AthleteClassification> createAthleteClassification(@Valid @RequestBody AthleteClassification athleteClassification) throws URISyntaxException {
        log.info("Request to create athleteClassification: {}", athleteClassification);
        AthleteClassification result = athleteClassificationRepository.save(athleteClassification);
        return ResponseEntity.created(new URI("/api/athleteClassifications/" + result.getId()))
                .body(result);
    }
    
    // update athleteClassification rest api
    @PutMapping("/{id}")
    ResponseEntity<AthleteClassification> updateAthleteClassification(@Valid @RequestBody AthleteClassification athleteClassification) {
        log.info("Request to update athleteClassification: {}", athleteClassification);
        AthleteClassification result = athleteClassificationRepository.save(athleteClassification);
        return ResponseEntity.ok().body(result);
    }
    
    // delete athleteClassification rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAthleteClassification(@PathVariable Long id) {
        log.info("Request to delete athleteClassification: {}", id);
        athleteClassificationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
