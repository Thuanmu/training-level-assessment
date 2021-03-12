package com.thuanmu.traininglevelassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.RankingsHistory;

@Repository
public interface RankingsHistoryRepository extends JpaRepository<RankingsHistory, Long> {

}
