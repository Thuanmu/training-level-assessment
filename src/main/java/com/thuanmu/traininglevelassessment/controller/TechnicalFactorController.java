package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;
import com.thuanmu.traininglevelassessment.repository.TechnicalFactorRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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

	// get all technicalFactors order by createAt desc
    @GetMapping
    public List <TechnicalFactor> getAllTechnicalFactors() {
        return technicalFactorRepository.findAllByOrderByCreateAtDesc();
    }
    
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
    
    // get technicalFactors by status rest api
    @GetMapping("/status")
    public List<TechnicalFactor> getTechnicalFactorsByStatus() {
        return technicalFactorRepository.findByStatus();
    }
    
    // create technicalFactor rest api
    @PostMapping
    ResponseEntity<TechnicalFactor> createTechnicalFactor(@Valid @RequestBody TechnicalFactor technicalFactor) throws URISyntaxException {
        log.info("Request to create technicalFactor: {}", technicalFactor);
        TechnicalFactor result = technicalFactorRepository.save(technicalFactor);
        return ResponseEntity.created(new URI("/api/technicalFactors/" + result.getId()))
                .body(result);
    }
    
    // update technicalFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<TechnicalFactor> updateTechnicalFactor(@Valid @RequestBody TechnicalFactor technicalFactor) {
        log.info("Request to update technicalFactor: {}", technicalFactor);
        TechnicalFactor result = technicalFactorRepository.save(technicalFactor);
        return ResponseEntity.ok().body(result);
    }
    
    // delete technicalFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnicalFactor(@PathVariable Long id) {
        log.info("Request to delete technicalFactor: {}", id);
        technicalFactorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
