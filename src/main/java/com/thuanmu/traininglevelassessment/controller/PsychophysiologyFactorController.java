package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;
import com.thuanmu.traininglevelassessment.repository.PsychophysiologyFactorRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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
    @GetMapping("/coachUser/{coachId}")
    public List <PsychophysiologyFactor> getAllPsychophysiologyFactorsByCoachId(@PathVariable Long coachId) {
        return psychophysiologyFactorRepository.findAllByCoachId(coachId);
    }
    
    // get all psychophysiologyFactors by athleteCodeUsed order by createAt desc (for athlete user)
    @GetMapping("/athleteUser/{athleteCodeUsed}")
    public List <PsychophysiologyFactor> getAllPsychophysiologyFactorsByAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
        return psychophysiologyFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed);
    }
    
    // get psychophysiologyFactors by status and coachId (for coach user)
    @GetMapping("/status/{coachId}")
    public List<PsychophysiologyFactor> getPsychophysiologyFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return psychophysiologyFactorRepository.findByStatusAndCoachId(coachId);
    }
    
    // get psychophysiologyFactors by status and athleteCodeUsed (for athlete user)
    @GetMapping("/status/{athleteCodeUsed}")
    public List<PsychophysiologyFactor> getPsychophysiologyFactorsByStatusAndAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
        return psychophysiologyFactorRepository.findByStatusAndAthleteCodeUsed(athleteCodeUsed);
    }
    
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
    ResponseEntity<PsychophysiologyFactor> createPsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) throws URISyntaxException {
        log.info("Request to create psychophysiologyFactor: {}", psychophysiologyFactor);
        PsychophysiologyFactor result = psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.created(new URI("/api/psychophysiologyFactors/" + result.getId()))
                .body(result);
    }
    
    // update psychophysiologyFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<PsychophysiologyFactor> updatePsychophysiologyFactor(@Valid @RequestBody PsychophysiologyFactor psychophysiologyFactor) {
        log.info("Request to update psychophysiologyFactor: {}", psychophysiologyFactor);
        PsychophysiologyFactor result = psychophysiologyFactorRepository.save(psychophysiologyFactor);
        return ResponseEntity.ok().body(result);
    }
    
    // delete psychophysiologyFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePsychophysiologyFactor(@PathVariable Long id) {
        log.info("Request to delete psychophysiologyFactor: {}", id);
        psychophysiologyFactorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
