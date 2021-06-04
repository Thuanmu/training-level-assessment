package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
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
@RequestMapping("/api/technicalFactors")
public class TechnicalFactorController {
	
	private final Logger log = LoggerFactory.getLogger(TechnicalFactorController.class);
	
	@Autowired
    private TechnicalFactorRepository technicalFactorRepository;

	
	
	public TechnicalFactorController(TechnicalFactorRepository technicalFactorRepository) {
		super();
		this.technicalFactorRepository = technicalFactorRepository;
	}

	// get all technicalFactors by coachId order by createAt desc (for coach user)
	@GetMapping("/coachUser")
    public ResponseEntity<Map<String, Object>> getAllTechnicalFactorsByCoachId(
    		@RequestParam(required = false) Long coachId,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<TechnicalFactor> technicalFactors = new ArrayList<TechnicalFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<TechnicalFactor> pageTechnicalFactors = technicalFactorRepository.findAllByCoachId(coachId, paging); 	       
    	      technicalFactors = pageTechnicalFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("technicalFactors", technicalFactors);
    	      response.put("currentPage", pageTechnicalFactors.getNumber());
    	      response.put("totalItems", pageTechnicalFactors.getTotalElements());
    	      response.put("totalPages", pageTechnicalFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    // get all technicalFactors by athleteCodeUsed order by createAt desc (for athlete user)
    @GetMapping("/athleteUser")
    public ResponseEntity<Map<String, Object>> getAllTechnicalFactorsByAthleteCodeUsed(
    		@RequestParam(required = false) String athleteCodeUsed,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<TechnicalFactor> technicalFactors = new ArrayList<TechnicalFactor>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<TechnicalFactor> pageTechnicalFactors = technicalFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed, paging); 	       
    	      technicalFactors = pageTechnicalFactors.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("technicalFactors", technicalFactors);
    	      response.put("currentPage", pageTechnicalFactors.getNumber());
    	      response.put("totalItems", pageTechnicalFactors.getTotalElements());
    	      response.put("totalPages", pageTechnicalFactors.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    // get technicalFactors by status and coachId (for coach user)
    @GetMapping("/status/{coachId}")
    public List<TechnicalFactor> getTechnicalFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return technicalFactorRepository.findByStatusAndCoachId(coachId);
    }
    
//    // get technicalFactors by status and athleteCodeUsed (for athlete user)
//    @GetMapping("/status/{athleteCodeUsed}")
//    public List<TechnicalFactor> getTechnicalFactorsByStatusAndAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
//        return technicalFactorRepository.findByStatusAndAthleteCodeUsed(athleteCodeUsed);
//    }
    
    // get technicalFactor by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getTechnicalFactor(@PathVariable Long id) {
        Optional<TechnicalFactor> technicalFactor = technicalFactorRepository.findById(id);
        return technicalFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get technicalFactor by technicalFactorCode rest api
    @GetMapping("/{technicalFactorCode}/code")
    ResponseEntity<?> getTechnicalFactorByTechnicalFactorCode(@PathVariable String technicalFactorCode) {
        Optional<TechnicalFactor> technicalFactor = technicalFactorRepository.findByTechnicalFactorCode(technicalFactorCode);
        return technicalFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    // create technicalFactor rest api
    @PostMapping
    ResponseEntity<?> createTechnicalFactor(@Valid @RequestBody TechnicalFactor technicalFactor) throws URISyntaxException {
        log.info("Request to create technicalFactor: {}", technicalFactor);
        TechnicalFactor result = technicalFactorRepository.save(technicalFactor);
        return ResponseEntity.created(new URI("/api/technicalFactors/" + result.getId()))
        		.body(new MessageResponse("TechnicalFactor have been added!"));
    }
    
    // update technicalFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<?> updateTechnicalFactor(@Valid @RequestBody TechnicalFactor technicalFactor) {
        log.info("Request to update technicalFactor: {}", technicalFactor);
        technicalFactorRepository.save(technicalFactor);
        return ResponseEntity.ok().body(new MessageResponse("TechnicalFactor have been edited!"));
    }
    
    // delete technicalFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnicalFactor(@PathVariable Long id) {
        log.info("Request to delete technicalFactor: {}", id);
        technicalFactorRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("TechnicalFactor has been deleted!"));
    }
	
}
