package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;
import com.thuanmu.traininglevelassessment.repository.PhysicalFactorRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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

	// get all physicalFactors order by createAt desc
    @GetMapping
    public List <PhysicalFactor> getAllPhysicalFactors() {
        return physicalFactorRepository.findAllByOrderByCreateAtDesc();
    }
    
    // get physicalFactor by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getPhysicalFactor(@PathVariable Long id) {
        Optional<PhysicalFactor> physicalFactor = physicalFactorRepository.findById(id);
        return physicalFactor.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // get physicalFactors by status rest api
    @GetMapping("/status")
    public List<PhysicalFactor> getPhysicalFactorsByStatus() {
        return physicalFactorRepository.findByStatus();
    }
    
    // create physicalFactor rest api
    @PostMapping
    ResponseEntity<PhysicalFactor> createPhysicalFactor(@Valid @RequestBody PhysicalFactor physicalFactor) throws URISyntaxException {
        log.info("Request to create physicalFactor: {}", physicalFactor);
        PhysicalFactor result = physicalFactorRepository.save(physicalFactor);
        return ResponseEntity.created(new URI("/api/physicalFactors/" + result.getId()))
                .body(result);
    }
    
    // update physicalFactor rest api
    @PutMapping("/{id}")
    ResponseEntity<PhysicalFactor> updatePhysicalFactor(@Valid @RequestBody PhysicalFactor physicalFactor) {
        log.info("Request to update physicalFactor: {}", physicalFactor);
        PhysicalFactor result = physicalFactorRepository.save(physicalFactor);
        return ResponseEntity.ok().body(result);
    }
    
    // delete physicalFactor rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePhysicalFactor(@PathVariable Long id) {
        log.info("Request to delete physicalFactor: {}", id);
        physicalFactorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
