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

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.PsychophysiologyFactorRepository;

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
@RequestMapping("/api/psychophysiologyFactors")
public class PsychophysiologyFactorController {
	
	private final Logger log = LoggerFactory.getLogger(PsychophysiologyFactorController.class);
	
	@Autowired
    private PsychophysiologyFactorRepository psychophysiologyFactorRepository;

	
	
	public PsychophysiologyFactorController(PsychophysiologyFactorRepository psychophysiologyFactorRepository) {
		super();
		this.psychophysiologyFactorRepository = psychophysiologyFactorRepository;
	}

	
	/**
     * Get all psychophysiologyFactors by coach id, page number and sorted by creation date in descending order (for coach user).
     *
     * @param coachId	the id of the coach.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of psychophysiologyFactors.
     */
	@GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAllPsychophysiologyFactorsByCoachId(
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<PsychophysiologyFactor> psychophysiologyFactors = new ArrayList<PsychophysiologyFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<PsychophysiologyFactor> pagePsychophysiologyFactors = psychophysiologyFactorRepository.findAllByCoachId(coachId, paging); 	       
    	      psychophysiologyFactors = pagePsychophysiologyFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("psychophysiologyFactors", psychophysiologyFactors);
    	      response.put("currentPage", pagePsychophysiologyFactors.getNumber());
    	      response.put("totalItems", pagePsychophysiologyFactors.getTotalElements());
    	      response.put("totalPages", pagePsychophysiologyFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
	
	/**
     * Get all psychophysiologyFactors by athlete code used, page number and sorted by creation date 
     * in descending order (for athlete user). The athlete user can view all the psychophysiologyFactors of 
     * the athletes that his/her coach manages.
     *
     * @param athleteCodeUsed	athlete code of the athlete is used for athlete user.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of psychophysiologyFactors.
     */
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAllPsychophysiologyFactorsByAthleteCodeUsed(
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<PsychophysiologyFactor> psychophysiologyFactors = new ArrayList<PsychophysiologyFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<PsychophysiologyFactor> pagePsychophysiologyFactors = psychophysiologyFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed, paging); 	       
    	      psychophysiologyFactors = pagePsychophysiologyFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("psychophysiologyFactors", psychophysiologyFactors);
    	      response.put("currentPage", pagePsychophysiologyFactors.getNumber());
    	      response.put("totalItems", pagePsychophysiologyFactors.getTotalElements());
    	      response.put("totalPages", pagePsychophysiologyFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all psychophysiologyFactors by status = 0 (unclassified) and coach id (for coach user). This method is used when 
     * the coach classifies athletes.
     *
     * @param coachId	the id of the coach.
     * @return	a list of all psychophysiologyFactors by status = 0 (unclassified) and coach id (for coach user).
     */
    @GetMapping("/status/{coachId}")
    public List<PsychophysiologyFactor> getPsychophysiologyFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return psychophysiologyFactorRepository.findByStatusAndCoachId(coachId);
    }
    
    
    /**
     * Get a psychophysiologyFactor by id.
     *
     * @param id	the id of the psychophysiologyFactor.
     * @return	a psychophysiologyFactor by id.
     */
    @GetMapping("/{id}")
    ResponseEntity<?> getPsychophysiologyFactor(@PathVariable Long id) {
        Optional<PsychophysiologyFactor> psychophysiologyFactor = psychophysiologyFactorRepository.findById(id);
        return psychophysiologyFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    /**
     * Get a psychophysiologyFactor by psychophysiologyFactor code.
     *
     * @param psychophysiologyFactorCode	the psychophysiologyFactor code of the psychophysiologyFactor.
     * @return	a psychophysiologyFactor by psychophysiologyFactor code.
     */
    @GetMapping("/{psychophysiologyFactorCode}/code")
    ResponseEntity<?> getPsychophysiologyFactorByPsychophysiologyFactorCode(@PathVariable String psychophysiologyFactorCode) {
        Optional<PsychophysiologyFactor> psychophysiologyFactor = psychophysiologyFactorRepository.findByPsychophysiologyFactorCode(psychophysiologyFactorCode);
        return psychophysiologyFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    
    /**
     * Create a psychophysiologyFactor.
     *
     * @param psychophysiologyFactor	the psychophysiologyFactor to save to the database.
     * @return	a message.
     */
    @PostMapping
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> createPsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) throws URISyntaxException {
        log.info("Request to create psychophysiologyFactor: {}", psychophysiologyFactor);
        PsychophysiologyFactor result = psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.created(new URI("/api/psychophysiologyFactors/" + result.getId()))
        		.body(new MessageResponse("PsychophysiologyFactor have been added!"));
    }
    
    
    /**
     * Update a psychophysiologyFactor.
     *
     * @param psychophysiologyFactor	the psychophysiologyFactor to update to the database.
     * @return	a message.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> updatePsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) {
        log.info("Request to update psychophysiologyFactor: {}", psychophysiologyFactor);
        psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.ok().body(new MessageResponse("PsychophysiologyFactor have been edited!"));
    }
    
    
    /**
     * Delete a psychophysiologyFactor by id.
     *
     * @param id	the id of the psychophysiologyFactor.
     * @return	a message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> deletePsychophysiologyFactor(@PathVariable Long id) {
        log.info("Request to delete psychophysiologyFactor: {}", id);
        psychophysiologyFactorRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("PsychophysiologyFactor has been deleted!"));
    }
	
}
