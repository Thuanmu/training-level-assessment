package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.FormFactor;
import com.thuanmu.traininglevelassessment.repository.FormFactorRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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
	
	// get all formFactors by coachId order by createAt desc (for coach user)
    @GetMapping("/coachUser/{coachId}")
    public List <FormFactor> getAllFormFactorsByCoachId(@PathVariable Long coachId) {
        return formFactorRepository.findAllByCoachId(coachId);
    }
    
    // get all formFactors by athleteCodeUsed order by createAt desc (for athlete user)
    @GetMapping("/athleteUser/{athleteCodeUsed}")
    public List <FormFactor> getAllFormFactorsByAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
        return formFactorRepository.findAllByAthleteCodeUsed(athleteCodeUsed);
    }
    
    // get formFactors by status and coachId (for coach user)
    @GetMapping("/status/{coachId}")
    public List<FormFactor> getFormFactorsByStatusAndCoachId(@PathVariable Long coachId) {
        return formFactorRepository.findByStatusAndCoachId(coachId);
    }
    
    // get formFactors by status and athleteCodeUsed (for athlete user)
    @GetMapping("/status/{athleteCodeUsed}")
    public List<FormFactor> getFormFactorsByStatusAndAthleteCodeUsed(@PathVariable String athleteCodeUsed) {
        return formFactorRepository.findByStatusAndAthleteCodeUsed(athleteCodeUsed);
    }
    
    // get formFactor by formFactorCode rest api
    @GetMapping("/{formFactorCode}/code")
    ResponseEntity<?> getFormFactorByFormFactorCode(@PathVariable String formFactorCode) {
        Optional<FormFactor> formFactor = formFactorRepository.findByFormFactorCode(formFactorCode);
        return formFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(null);
    }
    
    // get formFactor by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getFormFactor(@PathVariable Long id) {
        Optional<FormFactor> formFactor = formFactorRepository.findById(id);
        return formFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
        
    // create formFactor rest api
    @PostMapping
    ResponseEntity<FormFactor> createFormFactor(@Valid @RequestBody FormFactor formFactor) throws URISyntaxException {
        log.info("Request to create formFactor: {}", formFactor);
        FormFactor result = formFactorRepository.save(formFactor);
        return ResponseEntity.created(new URI("/api/formFactors/" + result.getId()))
                .body(result);
    }
    
    // update formFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<FormFactor> updateFormFactor(@Valid @RequestBody FormFactor formFactor) {
        log.info("Request to update formFactor: {}", formFactor);
        FormFactor result = formFactorRepository.save(formFactor);
        return ResponseEntity.ok().body(result);
    }
    
    // delete formFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFormFactor(@PathVariable Long id) {
        log.info("Request to delete formFactor: {}", id);
        formFactorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}
