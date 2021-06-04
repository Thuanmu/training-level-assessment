package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.Athlete;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.AthleteRepository;
import com.thuanmu.traininglevelassessment.repository.FormFactorRepository;
import com.thuanmu.traininglevelassessment.repository.PhysicalFactorRepository;
import com.thuanmu.traininglevelassessment.repository.PsychophysiologyFactorRepository;
import com.thuanmu.traininglevelassessment.repository.TechnicalFactorRepository;

import javax.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/athletes")
public class AthleteController {
	
	private final Logger log = LoggerFactory.getLogger(AthleteController.class);
	
	@Autowired
    private AthleteRepository athleteRepository;
	
	@Autowired
	private FormFactorRepository formFactorRepository;
	
	@Autowired
	private PhysicalFactorRepository physicalFactorRepository;
	
	@Autowired
	private PsychophysiologyFactorRepository psychophysiologyFactorRepository;
	
	@Autowired
	private TechnicalFactorRepository technicalFactorRepository;

	
	
	public AthleteController(AthleteRepository athleteRepository) {
		super();
		this.athleteRepository = athleteRepository;
	}
	
	// get all athletes sorted by athleteCode
    @GetMapping
    public List<Athlete> getAllAthletes() {
        return athleteRepository.findAllByOrderByAthleteCode();
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

	// get all athletes by coachId and paging (for coach user)
    @GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAllAthletesByCoachIdAndPaging(
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(required = false) String athleteName,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<Athlete> athletes = new ArrayList<Athlete>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<Athlete> pageAthletes;  	      
    	      if (athleteName == null) {
    	    	  pageAthletes = athleteRepository.findAllByCoachIdAndPaging(coachId, paging);
    	      }
    	      else {
    	    	  pageAthletes = athleteRepository.findByCoachIdAndAthleteNameContaining(coachId, athleteName, paging);
    	      }
    	      
    	      athletes = pageAthletes.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("athletes", athletes);
    	      response.put("currentPage", pageAthletes.getNumber());
    	      response.put("totalItems", pageAthletes.getTotalElements());
    	      response.put("totalPages", pageAthletes.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    // get all athletes by athleteCodeUsed and paging (for athlete user)
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAllAthletesByAthleteCodeUsedAndPaging(
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(required = false) String athleteName,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<Athlete> athletes = new ArrayList<Athlete>();
    	      Pageable paging = PageRequest.of(page, size);
    	          	          	      
    	      Page<Athlete> pageAthletes;  	      
    	      if (athleteName == null) {
    	    	  pageAthletes = athleteRepository.findAllByAthleteCodeUsed(athleteCodeUsed, paging);
    	      }
    	      else {
    	    	  pageAthletes = athleteRepository.findByAthleteCodeUsedAndAthleteNameContaining(athleteCodeUsed, athleteName, paging);
    	      }
    	      
    	      athletes = pageAthletes.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("athletes", athletes);
    	      response.put("currentPage", pageAthletes.getNumber());
    	      response.put("totalItems", pageAthletes.getTotalElements());
    	      response.put("totalPages", pageAthletes.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    // get athlete by id rest api
    @GetMapping("/{id}")
    public ResponseEntity<?> getAthlete(@PathVariable Long id) {
        Optional<Athlete> athlete = athleteRepository.findById(id);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get athlete by athleteCode rest api
    @GetMapping("/{athleteCode}/code")
    public ResponseEntity<?> getAthleteByAthleteCode(@PathVariable String athleteCode) {
        Optional<Athlete> athlete = athleteRepository.findByAthleteCode(athleteCode);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create athlete rest api
    @PostMapping
//    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> createAthlete(@Valid @RequestBody Athlete athlete) throws URISyntaxException {
        log.info("Request to create athlete: {}", athlete);
        
        Athlete result = athleteRepository.save(athlete);
        return ResponseEntity.created(new URI("/api/athletes/" + result.getId()))
                .body(new MessageResponse("Athlete have been added!"));
    }
    
    // update athlete rest api
    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> updateAthlete(@Valid @RequestBody Athlete athlete) {
        log.info("Request to update athlete: {}", athlete);
        
        athleteRepository.save(athlete);
        return ResponseEntity.ok().body(new MessageResponse("Athlete have been edited!"));
    }
    
    // delete athlete rest api
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> deleteAthlete(@PathVariable Long id) {
        log.info("Request to delete athlete: {}", id);
        
        
        
        if (physicalFactorRepository.existsByAthleteId(id) || technicalFactorRepository.existsByAthleteId(id) 
        		|| psychophysiologyFactorRepository.existsByAthleteId(id) || formFactorRepository.existsByAthleteId(id)) {
        	
        	return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: You can't delete an athlete with factors added!"));
        }
        
        athleteRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Athlete has been deleted!"));
    }
	
}
