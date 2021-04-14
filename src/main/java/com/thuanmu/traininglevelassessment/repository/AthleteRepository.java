package com.thuanmu.traininglevelassessment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.Athlete;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
	
	Optional<Athlete> findByAthleteCode(String athleteCode);

}
