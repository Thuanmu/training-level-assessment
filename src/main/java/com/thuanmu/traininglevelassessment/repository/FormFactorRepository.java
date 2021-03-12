package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.FormFactor;

@Repository
public interface FormFactorRepository extends JpaRepository<FormFactor, Long> {

}
