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

import com.thuanmu.traininglevelassessment.entity.AthleteClassification;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.AthleteClassificationRepository;

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
@RequestMapping("/api/athleteClassifications")
public class AthleteClassificationController {
	
	private final Logger log = LoggerFactory.getLogger(AthleteClassificationController.class);
	
	@Autowired
    private AthleteClassificationRepository athleteClassificationRepository;
		
	public AthleteClassificationController(AthleteClassificationRepository athleteClassificationRepository) {
		super();
		this.athleteClassificationRepository = athleteClassificationRepository;
	}

	
	/**
	 * Get all athleteClassifications by coach id (for coach user). This method is used when the coach classifies athletes
	 * 
	 * @param coachId	the id of the coach.
	 * @return	a list of athleteClassifications by coach id.
	 */
    @GetMapping("/coachUser/{coachId}")
    public List<AthleteClassification> getAllAthleteClassificationsByCoachId(@PathVariable Long coachId) {
        return athleteClassificationRepository.findAllByCoachId(coachId);
    }
    
    
    /**
     * Get all athleteClassifications by month, year, coach id and page number (for coach user).
     * This method is used to display data for the rankings.
     * 
     * @param month		month of classification
     * @param year		year of classification
     * @param coachId	the id of the coach.
     * @param page		the index of the current page (index 0 corresponds to page number 1).
     * @param size		number of elements of a page.
     * @return	a response containing the information of a page of athleteClassifications.
     */
    @GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAthleteClassificationsByMonthAndYearAndCoachId(
    		@RequestParam(required = false) int month,
    		@RequestParam(required = false) int year,
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<AthleteClassification> athleteClassifications = new ArrayList<AthleteClassification>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<AthleteClassification> pageAthleteClassifications = athleteClassificationRepository.findByMonthAndYearAndCoachId(month, year, coachId, paging); 	       
    	      athleteClassifications = pageAthleteClassifications.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("athleteClassifications", athleteClassifications);
    	      response.put("currentPage", pageAthleteClassifications.getNumber());
    	      response.put("totalItems", pageAthleteClassifications.getTotalElements());
    	      response.put("totalPages", pageAthleteClassifications.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get all athleteClassifications by month, year, athlete code used and page number (for athlete user).
     * This method is used to display data for the rankings.
     * 
     * @param month		month of classification
     * @param year		year of classification
     * @param athleteCodeUsed	athlete code of the athlete is used for athlete user.
     * @param page		the index of the current page (index 0 corresponds to page number 1).
     * @param size		number of elements of a page.
     * @return	a response containing the information of a page of athleteClassifications.
     */
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAthleteClassificationsByMonthAndYearAndAthleteCodeUsed(
    		@RequestParam(required = false) int month,
    		@RequestParam(required = false) int year,
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<AthleteClassification> athleteClassifications = new ArrayList<AthleteClassification>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<AthleteClassification> pageAthleteClassifications = athleteClassificationRepository.findByMonthAndYearAndAthleteCodeUsed(month, year, athleteCodeUsed, paging); 	       
    	      athleteClassifications = pageAthleteClassifications.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("athleteClassifications", athleteClassifications);
    	      response.put("totalPages", pageAthleteClassifications.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    
    /**
     * Get athleteClassifications by athlete code. This method is used to display data for the chart.
     *
     * @param athleteCode	the athlete code of the athlete.
     * @return	a list of athleteClassifications by athlete code.
     */
    @GetMapping("/athlete/{athleteCode}")
    public List<AthleteClassification> getAthleteClassificationByAthleteCode(@PathVariable String athleteCode) {
    	return athleteClassificationRepository.findByAthleteCode(athleteCode);
    }
    
    
    /**
     * Create an athleteClassification.
     *
     * @param athleteClassification		the athleteClassification to save to the database.
     * @return	a message.
     */
    @PostMapping
    @PreAuthorize("hasRole('COACH')")
    ResponseEntity<?> createAthleteClassification(@Valid @RequestBody AthleteClassification athleteClassification) throws URISyntaxException {
        log.info("Request to create athleteClassification: {}", athleteClassification);
        AthleteClassification result = athleteClassificationRepository.save(athleteClassification);
        return ResponseEntity.created(new URI("/api/athleteClassifications/" + result.getId()))
        		.body(new MessageResponse("You have classified successful athletes!"));
    }
    
//    // get athleteClassification by id rest api
//    @GetMapping("/{id}")
//    ResponseEntity<?> getAthleteClassification(@PathVariable Long id) {
//        Optional<AthleteClassification> athleteClassification = athleteClassificationRepository.findById(id);
//        return athleteClassification.map(response -> ResponseEntity.ok().body(response))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//    
//    // update athleteClassification rest api
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
//    ResponseEntity<AthleteClassification> updateAthleteClassification(@Valid @RequestBody AthleteClassification athleteClassification) {
//        log.info("Request to update athleteClassification: {}", athleteClassification);
//        AthleteClassification result = athleteClassificationRepository.save(athleteClassification);
//        return ResponseEntity.ok().body(result);
//    }
//    
//    // delete athleteClassification rest api
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('COACH')")
//    public ResponseEntity<?> deleteAthleteClassification(@PathVariable Long id) {
//        log.info("Request to delete athleteClassification: {}", id);
//        athleteClassificationRepository.deleteById(id);
//        return ResponseEntity.ok().build();
//    }

}
