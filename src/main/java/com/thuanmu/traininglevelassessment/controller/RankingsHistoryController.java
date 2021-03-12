package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.RankingsHistory;
import com.thuanmu.traininglevelassessment.repository.RankingsHistoryRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/rankingsHistorys")
public class RankingsHistoryController {
	
	private final Logger log = LoggerFactory.getLogger(RankingsHistoryController.class);
	
	@Autowired
    private RankingsHistoryRepository rankingsHistoryRepository;

	
	
	public RankingsHistoryController(RankingsHistoryRepository rankingsHistoryRepository) {
		super();
		this.rankingsHistoryRepository = rankingsHistoryRepository;
	}

	// get all rankingsHistorys
    @GetMapping
    public List <RankingsHistory> getAllRankingsHistorys() {
        return rankingsHistoryRepository.findAll();
    }
    
    // get rankingsHistory by id rest api
    @GetMapping("/{id}")
    ResponseEntity<?> getRankingsHistory(@PathVariable Long id) {
        Optional<RankingsHistory> rankingsHistory = rankingsHistoryRepository.findById(id);
        return rankingsHistory.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create rankingsHistory rest api
    @PostMapping
    ResponseEntity<RankingsHistory> createRankingsHistory(@Valid @RequestBody RankingsHistory rankingsHistory) throws URISyntaxException {
        log.info("Request to create rankingsHistory: {}", rankingsHistory);
        RankingsHistory result = rankingsHistoryRepository.save(rankingsHistory);
        return ResponseEntity.created(new URI("/api/rankingsHistorys/" + result.getId()))
                .body(result);
    }
    
    // update rankingsHistory rest api
    @PutMapping("/{id}")
    ResponseEntity<RankingsHistory> updateRankingsHistory(@Valid @RequestBody RankingsHistory rankingsHistory) {
        log.info("Request to update rankingsHistory: {}", rankingsHistory);
        RankingsHistory result = rankingsHistoryRepository.save(rankingsHistory);
        return ResponseEntity.ok().body(result);
    }
    
    // delete rankingsHistory rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRankingsHistory(@PathVariable Long id) {
        log.info("Request to delete rankingsHistory: {}", id);
        rankingsHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
	
}
