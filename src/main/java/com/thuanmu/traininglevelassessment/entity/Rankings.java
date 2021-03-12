package com.thuanmu.traininglevelassessment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "rankings")
public class Rankings {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11, nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "rankings_history_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private RankingsHistory rankingsHistory;
	
	@Column(name = "total_scores_of_criterias", length = 3)
	private Long totalScoresOfCriterias;
	
	@Column(name = "grade", length = 50)
	private String grade;
	
	@Column(name = "athlete_rank", length = 50)
	private String athleteRank;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Athlete getAthlete() {
		return athlete;
	}

	public void setAthlete(Athlete athlete) {
		this.athlete = athlete;
	}

	public RankingsHistory getRankingsHistory() {
		return rankingsHistory;
	}

	public void setRankingsHistory(RankingsHistory rankingsHistory) {
		this.rankingsHistory = rankingsHistory;
	}

	public Long getTotalScoresOfCriterias() {
		return totalScoresOfCriterias;
	}

	public void setTotalScoresOfCriterias(Long totalScoresOfCriterias) {
		this.totalScoresOfCriterias = totalScoresOfCriterias;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getAthleteRank() {
		return athleteRank;
	}

	public void setAthleteRank(String athleteRank) {
		this.athleteRank = athleteRank;
	}
		
}
