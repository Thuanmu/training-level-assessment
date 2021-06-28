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

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.PhysicalFactorRepository;

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
@RequestMapping("/api/physicalFactors")
public class PhysicalFactorController {
	
	private final Logger log = LoggerFactory.getLogger(PhysicalFactorController.class);
	
	@Autowired
    private PhysicalFactorRepository physicalFactorRepository;

	
	
	public PhysicalFactorController(PhysicalFactorRepository physicalFactorRepository) {
		super();
		this.physicalFactorRepository = physicalFactorRepository;
	}

	
	/**
     * Get all physicalFactors by coach id, page number and sorted by creation date in descending order (for coach user).
     *
     * @param coachId	the id of the coach.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of physicalFactors.
     */
	@GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAllPhysicalFactorsByCoachId(
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<PhysicalFactor> physicalFactors = new ArrayList<PhysicalFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<PhysicalFactor> pagePhysicalFactors = physicalFactorRepository.findAllByCoachId(coachId, paging); 	       
    	      physicalFactors = pagePhysicalFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("physicalFactors", physicalFactors);
    	      response.put("currentPage", pagePhysicalFactors.getNumber());
    	      response.put("totalItems", pagePhysicalFactors.getTotalElements());
    	      response.put("totalPages", pagePhysicalFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
	
	/**
     * Get all physicalFactors by athlete code used, page number and sorted by creation date 
     * in descending order (for athlete user). The athlete user can view all the formFactors of 
     * the athletes that his/her coach manages.
     *
     * @param athleteCodeUsed	athlete code of the athlete is used for athlete user.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of physicalFactors.
     */
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAllPhysicalFactorsByAthleteCodeUsed(
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<PhysicalFactor> physicalFactors = new ArrayList<PhysicalFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<PhysicalFactor> pagePhysicalFactors = physicalFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed, paging); 	       
    	      physicalFactors = pagePhysicalFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("physicalFactors", physicalFactors);
    	      response.put("currentPage", pagePhysicalFactors.getNumber());
    	      response.put("totalItems", pagePhysicalFactors.getTotalElements());
    	      response.put("totalPages", pagePhysicalFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all physicalFactors by status = 0 (unclassified) and coach id (for coach user). This method is used when the coach 
     * classifies athletes.
     *
     * @param coachId	the id of the coach.
     * @return	a list of all physicalFactors by status = 0 (unclassified) and coach id (for coach user).
     */
    @GetMapping("/status/{coachId}")
    public List<PhysicalFactor> getPhysicalFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return physicalFactorRepository.findByStatusAndCoachId(coachId);
    }
    
    
    /**
     * Get a physicalFactor by id.
     *
     * @param id	the id of the physicalFactor.
     * @return	a physicalFactor by id.
     */
    @GetMapping("/{id}")
    ResponseEntity<?> getPhysicalFactor(@PathVariable Long id) {
        Optional<PhysicalFactor> physicalFactor = physicalFactorRepository.findById(id);
        return physicalFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    /**
     * Get a physicalFactor by physicalFactor code.
     *
     * @param physicalFactorCode	the physicalFactor code of the physicalFactor.
     * @return	a physicalFactor by physicalFactor code.
     */
    @GetMapping("/{physicalFactorCode}/code")
    ResponseEntity<?> getPhysicalFactorByPhysicalFactorCode(@PathVariable String physicalFactorCode) {
        Optional<PhysicalFactor> physicalFactor = physicalFactorRepository.findByPhysicalFactorCode(physicalFactorCode);
        return physicalFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    
    /**
     * Create a physicalFactor.
     *
     * @param physicalFactor	the physicalFactor to save to the database.
     * @return	a message.
     */
    @PostMapping
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> createPhysicalFactor(@Valid @RequestBody PhysicalFactor physicalFactor) throws URISyntaxException {
        log.info("Request to create physicalFactor: {}", physicalFactor);
        PhysicalFactor result = physicalFactorRepository.save(physicalFactor);
        return ResponseEntity.created(new URI("/api/physicalFactors/" + result.getId()))
        		.body(new MessageResponse("PhysicalFactor have been added!"));
    }
    
    
    /**
     * Update a physicalFactor.
     *
     * @param physicalFactor	the physicalFactor to update to the database.
     * @return	a message.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> updatePhysicalFactor(@Valid @RequestBody PhysicalFactor physicalFactor) {
        log.info("Request to update physicalFactor: {}", physicalFactor);
        physicalFactorRepository.save(physicalFactor);
        return ResponseEntity.ok().body(new MessageResponse("PhysicalFactor have been edited!"));
    }
    
    
    /**
     * Delete a physicalFactor by id.
     *
     * @param id	the id of the physicalFactor.
     * @return	a message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> deletePhysicalFactor(@PathVariable Long id) {
        log.info("Request to delete physicalFactor: {}", id);
        physicalFactorRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("PhysicalFactor has been deleted!"));
    }
	
}
