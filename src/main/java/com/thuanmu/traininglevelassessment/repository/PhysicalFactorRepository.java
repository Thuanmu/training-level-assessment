package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.PhysicalFactor;

@Repository
public interface PhysicalFactorRepository extends JpaRepository<PhysicalFactor, Long> {

}
