package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PsychophysiologyFactor;

@Repository
public interface PsychophysiologyFactorRepository extends JpaRepository<PsychophysiologyFactor, Long> {

}
