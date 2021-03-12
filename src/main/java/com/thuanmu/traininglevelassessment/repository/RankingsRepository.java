package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.Rankings;

@Repository
public interface RankingsRepository extends JpaRepository<Rankings, Long> {

}
