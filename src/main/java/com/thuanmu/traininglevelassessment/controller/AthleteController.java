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
	
	/**
     * Get all athletes in the database and sorted by athlete code. This method is used when the coach creates a new athlete 
     * and the system will generate a new athlete code based on this list of athletes.
     *
     * @return	a list of all athletes in the database and sorted by athlete code.
     */
    @GetMapping
    public List<Athlete> getAllAthletes() {
        return athleteRepository.findAllByOrderByAthleteCode();
    }
    
    
    /**
     * Get all athletes by coach id (for coach user). This method is used when the coach creates the factors 
     * or classifies athletes
     *
     * @param coachId	the id of the coach.
     * @return	a list of athletes by coach id.
     */
    @GetMapping("/coachUser/{coachId}")
    public List<Athlete> getAllAthletesByCoachId(@PathVariable Long coachId) {
        return athleteRepository.findAllByCoachId(coachId);
    }
    
    
    /**
     * Get all athletes by coach id and page number (for coach user).
     *
     * @param coachId	the id of the coach.
     * @param athleteName	name of athlete.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of athletes.
     */
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
//    	      response.put("currentPage", pageAthletes.getNumber());
//    	      response.put("totalItems", pageAthletes.getTotalElements());
    	      response.put("totalPages", pageAthletes.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all athletes by athlete code used and page number (for athlete user). The athlete user
     * can view all the athletes that his/her coach manages.
     *
     * @param athleteCodeUsed	athlete code of the athlete is used for athlete user.
     * @param athleteName	name of athlete.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of athletes.
     */
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
    	      response.put("totalPages", pageAthletes.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get an athlete by id.
     *
     * @param id	the id of the athlete.
     * @return	an athlete by id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getAthlete(@PathVariable Long id) {
        Optional<Athlete> athlete = athleteRepository.findById(id);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    /**
     * Get an athlete by athlete code.
     *
     * @param athleteCode	the athlete code of the athlete.
     * @return	an athlete by athlete code.
     */
    @GetMapping("/{athleteCode}/code")
    public ResponseEntity<?> getAthleteByAthleteCode(@PathVariable String athleteCode) {
        Optional<Athlete> athlete = athleteRepository.findByAthleteCode(athleteCode);
        return athlete.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    /**
     * Create an athlete.
     *
     * @param athlete	the athlete to save to the database.
     * @return	a message.
     */
    @PostMapping
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> createAthlete(@Valid @RequestBody Athlete athlete) throws URISyntaxException {
        log.info("Request to create athlete: {}", athlete);
        
        Athlete result = athleteRepository.save(athlete);
        return ResponseEntity.created(new URI("/api/athletes/" + result.getId()))
                .body(new MessageResponse("Athlete have been added!"));
    }
    
    
    /**
     * Update an athlete.
     *
     * @param athlete	the athlete to update to the database.
     * @return	a message.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> updateAthlete(@Valid @RequestBody Athlete athlete) {
        log.info("Request to update athlete: {}", athlete);
        
        athleteRepository.save(athlete);
        return ResponseEntity.ok().body(new MessageResponse("Athlete have been edited!"));
    }
    
    
    /**
     * Delete an athlete by id.
     *
     * @param id	the id of the athlete.
     * @return	a message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
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
