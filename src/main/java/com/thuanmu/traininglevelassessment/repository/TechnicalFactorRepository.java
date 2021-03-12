package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.TechnicalFactor;

@Repository
public interface TechnicalFactorRepository extends JpaRepository<TechnicalFactor, Long> {

}
