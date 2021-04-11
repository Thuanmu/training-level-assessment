package com.thuanmu.traininglevelassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.AthleteClassification;

@Repository
public interface AthleteClassificationRepository extends JpaRepository<AthleteClassification, Long> {
	
	@Query(value = "select ac.* from athlete_classification ac where ac.create_at = (select max(ac.create_at) from athlete_classification ac where month(ac.create_at) = ?1 and year(ac.create_at) = ?2) order by ac.athlete_rank", nativeQuery = true)
	List<AthleteClassification> findByMonthAndYear(int month, int year);
	
	@Query(value = "select ac.* from athlete_classification ac where ac.create_at in (select max(ac.create_at) as lastDateOfMonth from athlete_classification ac group by month(ac.create_at)) group by ac.create_at order by ac.create_at desc", nativeQuery = true)
	List<AthleteClassification> findByLastDateOfMonth();
	
	@Query(value = "select ac.* from athlete_classification ac where ac.athlete_id = ?1 and ac.create_at in (select max(ac.create_at) as lastDateOfMonth from athlete_classification ac group by month(ac.create_at)) group by ac.create_at order by ac.create_at", nativeQuery = true)
	List<AthleteClassification> findByAthleteIdAndLastDateOfMonth(Long athleteId);

}
