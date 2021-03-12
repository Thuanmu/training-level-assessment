package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.Rankings;
import com.thuanmu.traininglevelassessment.repository.RankingsRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rankingsList")
public class RankingsController {
	
	private final Logger log = LoggerFactory.getLogger(RankingsController.class);
	
	@Autowired
    private RankingsRepository rankingsRepository;

	
	
	public RankingsController(RankingsRepository rankingsRepository) {
		super();
		this.rankingsRepository = rankingsRepository;
	}

	// get all rankingsList
    @GetMapping
    public List <Rankings> getAllRankingsList() {
        return rankingsRepository.findAll();
    }
    
    // get rankings by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getRankings(@PathVariable Long id) {
        Optional<Rankings> rankings = rankingsRepository.findById(id);
        return rankings.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create rankings rest api
    @PostMapping
    ResponseEntity<Rankings> createRankings(@Valid @RequestBody Rankings rankings) throws URISyntaxException {
        log.info("Request to create rankings: {}", rankings);
        Rankings result = rankingsRepository.save(rankings);
        return ResponseEntity.created(new URI("/api/rankingsList/" + result.getId()))
                .body(result);
    }
    
    // update rankings rest api
    @PutMapping("/{id}")
    ResponseEntity<Rankings> updateRankings(@Valid @RequestBody Rankings rankings) {
        log.info("Request to update rankings: {}", rankings);
        Rankings result = rankingsRepository.save(rankings);
        return ResponseEntity.ok().body(result);
    }
    
    // delete rankings rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRankings(@PathVariable Long id) {
        log.info("Request to delete rankings: {}", id);
        rankingsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
