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
	
	// get all formFactors order by createAt desc
    @GetMapping
    public List <FormFactor> getAllFormFactors() {
        return formFactorRepository.findAllByOrderByCreateAtDesc();
    }
    
    // get formFactor by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getFormFactor(@PathVariable Long id) {
        Optional<FormFactor> formFactor = formFactorRepository.findById(id);
        return formFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get formFactors by status rest api
    @GetMapping("/status")
    public List<FormFactor> getFormFactorsByStatus() {
        return formFactorRepository.findByStatus();
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
