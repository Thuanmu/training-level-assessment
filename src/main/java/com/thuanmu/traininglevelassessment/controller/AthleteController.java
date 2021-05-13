package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.Athlete;
import com.thuanmu.traininglevelassessment.repository.AthleteRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/athletes")
public class AthleteController {
	
	private final Logger log = LoggerFactory.getLogger(AthleteController.class);
	
	@Autowired
    private AthleteRepository athleteRepository;

	
	
	public AthleteController(AthleteRepository athleteRepository) {
		super();
		this.athleteRepository = athleteRepository;
	}

	// get all athletes by coachId (for coach user)
    @GetMapping("/coachUser/{coachId}")
    public List<Athlete> getAllAthletesByCoachId(@PathVariable Long coachId) {
        return athleteRepository.findAllByCoachId(coachId);
    }
    
    
    // get all athletes by athleteCodeUsed (for athlete user)
    @GetMapping("/athleteUser/{athleteCodeUsed}")
    public List<Athlete> getAllAthletesByAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
        return athleteRepository.findAllByAthleteCodeUsed(athleteCodeUsed);
    }
    
    // get athlete by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getAthlete(@PathVariable Long id) {
        Optional<Athlete> athlete = athleteRepository.findById(id);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get athlete by athleteCode rest api
    @GetMapping("/{athleteCode}/code")
    ResponseEntity<?> getAthleteByAthleteCode(@PathVariable String athleteCode) {
        Optional<Athlete> athlete = athleteRepository.findByAthleteCode(athleteCode);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create athlete rest api
    @PostMapping
//    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<Athlete> createAthlete(@Valid @RequestBody Athlete athlete) throws URISyntaxException {
        log.info("Request to create athlete: {}", athlete);
        Athlete result = athleteRepository.save(athlete);
        return ResponseEntity.created(new URI("/api/athletes/" + result.getId()))
                .body(result);
    }
    
    // update athlete rest api
    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<Athlete> updateAthlete(@Valid @RequestBody Athlete athlete) {
        log.info("Request to update athlete: {}", athlete);
        Athlete result = athleteRepository.save(athlete);
        return ResponseEntity.ok().body(result);
    }
    
    // delete athlete rest api
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> deleteAthlete(@PathVariable Long id) {
        log.info("Request to delete athlete: {}", id);
        athleteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
