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

	// get all psychophysiologyFactors by coachId order by createAt desc (for coach user)
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
    
    // get all psychophysiologyFactors by athleteCodeUsed order by createAt desc (for athlete user)
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
    
    // get psychophysiologyFactors by status and coachId (for coach user)
    @GetMapping("/status/{coachId}")
    public List<PsychophysiologyFactor> getPsychophysiologyFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return psychophysiologyFactorRepository.findByStatusAndCoachId(coachId);
    }
    
//    // get psychophysiologyFactors by status and athleteCodeUsed (for athlete user)
//    @GetMapping("/status/{athleteCodeUsed}")
//    public List<PsychophysiologyFactor> getPsychophysiologyFactorsByStatusAndAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
//        return psychophysiologyFactorRepository.findByStatusAndAthleteCodeUsed(athleteCodeUsed);
//    }
    
    // get psychophysiologyFactor by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getPsychophysiologyFactor(@PathVariable Long id) {
        Optional<PsychophysiologyFactor> psychophysiologyFactor = psychophysiologyFactorRepository.findById(id);
        return psychophysiologyFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get psychophysiologyFactor by psychophysiologyFactorCode rest api
    @GetMapping("/{psychophysiologyFactorCode}/code")
    ResponseEntity<?> getPsychophysiologyFactorByPsychophysiologyFactorCode(@PathVariable String psychophysiologyFactorCode) {
        Optional<PsychophysiologyFactor> psychophysiologyFactor = psychophysiologyFactorRepository.findByPsychophysiologyFactorCode(psychophysiologyFactorCode);
        return psychophysiologyFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    // create psychophysiologyFactor rest api
    @PostMapping
    ResponseEntity<?> createPsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) throws URISyntaxException {
        log.info("Request to create psychophysiologyFactor: {}", psychophysiologyFactor);
        PsychophysiologyFactor result = psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.created(new URI("/api/psychophysiologyFactors/" + result.getId()))
        		.body(new MessageResponse("PsychophysiologyFactor have been added!"));
    }
    
    // update psychophysiologyFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<?> updatePsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) {
        log.info("Request to update psychophysiologyFactor: {}", psychophysiologyFactor);
        psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.ok(new MessageResponse("PsychophysiologyFactor have been edited!"));
    }
    
    // delete psychophysiologyFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePsychophysiologyFactor(@PathVariable Long id) {
        log.info("Request to delete psychophysiologyFactor: {}", id);
        psychophysiologyFactorRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("PsychophysiologyFactor has been deleted!"));
    }
	
}
