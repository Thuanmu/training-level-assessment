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
import com.thuanmu.traininglevelassessment.entity.FormFactor;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.FormFactorRepository;

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
@RequestMapping("/api/formFactors")
public class FormFactorController {

	private final Logger log = LoggerFactory.getLogger(FormFactorController.class);
	
	@Autowired
    private FormFactorRepository formFactorRepository;

	public FormFactorController(FormFactorRepository formFactorRepository) {
		super();
		this.formFactorRepository = formFactorRepository;
	}
	
	
	/**
     * Get all formFactors by coach id, page number and sorted by creation date in descending order (for coach user).
     *
     * @param coachId	the id of the coach.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of formFactors.
     */
    @GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAllFormFactorsByCoachId(
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<FormFactor> formFactors = new ArrayList<FormFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<FormFactor> pageFormFactors = formFactorRepository.findAllByCoachId(coachId, paging); 	       
    	      formFactors = pageFormFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("formFactors", formFactors);
    	      response.put("currentPage", pageFormFactors.getNumber());
    	      response.put("totalItems", pageFormFactors.getTotalElements());
    	      response.put("totalPages", pageFormFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all formFactors by athlete code used, page number and sorted by creation date in descending order (for athlete user).
     * The athlete user can view all the formFactors of the athletes that his/her coach manages.
     *
     * @param athleteCodeUsed	athlete code of the athlete is used for athlete user.
     * @param page	the index of the current page (index 0 corresponds to page number 1).
     * @param size	number of elements of a page.
     * @return	a response containing the information of a page of formFactors.
     */
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAllFormFactorsByAthleteCodeUsed(
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<FormFactor> formFactors = new ArrayList<FormFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<FormFactor> pageFormFactors = formFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed, paging); 	       
    	      formFactors = pageFormFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("formFactors", formFactors);
    	      response.put("currentPage", pageFormFactors.getNumber());
    	      response.put("totalItems", pageFormFactors.getTotalElements());
    	      response.put("totalPages", pageFormFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all formFactors by status = 0 (unclassified) and coach id (for coach user). This method is used when the coach 
     * classifies athletes.
     *
     * @param coachId	the id of the coach.
     * @return	a list of all formFactors by status = 0 (unclassified) and coach id (for coach user).
     */
    @GetMapping("/status/{coachId}")
    public List<FormFactor> getFormFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return formFactorRepository.findByStatusAndCoachId(coachId);
    }
    
    
    /**
     * Get a formFactor by formFactor code.
     *
     * @param formFactorCode	the formFactor code of the formFactor.
     * @return	a formFactor by formFactor code.
     */
    @GetMapping("/{formFactorCode}/code")
    ResponseEntity<?> getFormFactorByFormFactorCode(@PathVariable String formFactorCode) {
        Optional<FormFactor> formFactor = formFactorRepository.findByFormFactorCode(formFactorCode);
        return formFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    
    /**
     * Get a formFactor by id.
     *
     * @param id	the id of the formFactor.
     * @return	a formFactor by id.
     */
    @GetMapping("/{id}")
    ResponseEntity<?> getFormFactor(@PathVariable Long id) {
        Optional<FormFactor> formFactor = formFactorRepository.findById(id);
        return formFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    
    /**
     * Create a formFactor.
     *
     * @param formFactor	the formFactor to save to the database.
     * @return	a message.
     */
    @PostMapping
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> createFormFactor(@Valid @RequestBody FormFactor formFactor) throws URISyntaxException {
        log.info("Request to create formFactor: {}", formFactor);
        FormFactor result = formFactorRepository.save(formFactor);
        return ResponseEntity.created(new URI("/api/formFactors/" + result.getId()))
        		.body(new MessageResponse("FormFactor have been added!"));
    }
    
    
    /**
     * Update a formFactor.
     *
     * @param formFactor	the formFactor to update to the database.
     * @return	a message.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> updateFormFactor(@Valid @RequestBody FormFactor formFactor) {
        log.info("Request to update formFactor: {}", formFactor);
        formFactorRepository.save(formFactor);
        return ResponseEntity.ok().body(new MessageResponse("FormFactor have been edited!"));
    }
    
    
    /**
     * Delete a formFactor by id.
     *
     * @param id	the id of the formFactor.
     * @return	a message.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COACH')")
    public ResponseEntity<?> deleteFormFactor(@PathVariable Long id) {
        log.info("Request to delete formFactor: {}", id);
        formFactorRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("FormFactor has been deleted!"));
    }
    
}
