package com.thuanmu.traininglevelassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.FormFactor;

@Repository
public interface FormFactorRepository extends JpaRepository<FormFactor, Long> {
	
	List<FormFactor> findAllByOrderByCreateAtDesc();
	
	@Query(value = "select f.* from form_factor f where f.status = 0 order by f.athlete_id", nativeQuery = true)
	List<FormFactor> findByStatus();

}
