package com.thuanmu.traininglevelassessment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;



@Entity
@Table(name = "athlete")
public class Athlete {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
		
	@Column(name = "athlete_name", length = 255)
	private String athleteName;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	
	@Column(name = "hometown", length = 50)
	private String hometown;
	
	@Column(name = "total_scores_of_criterias", length = 3)
	private Double totalScoresOfCriterias;
	
	@Column(name = "grade", length = 50)
	private String grade;
	
	@Column(name = "athlete_rank", length = 50)
	private String athleteRank;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "create_at", columnDefinition = "datetime default current_timestamp")
	private LocalDateTime createAt;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "last_modified", columnDefinition = "datetime default current_timestamp")
	private LocalDateTime lastModified;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAthleteName() {
		return athleteName;
	}

	public void setAthleteName(String athleteName) {
		this.athleteName = athleteName;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getHometown() {
		return hometown;
	}

	public void setHometown(String hometown) {
		this.hometown = hometown;
	}

	public Double getTotalScoresOfCriterias() {
		return totalScoresOfCriterias;
	}

	public void setTotalScoresOfCriterias(Double totalScoresOfCriterias) {
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

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public LocalDateTime getLastModified() {
		return lastModified;
	}

	public void setLastModified(LocalDateTime lastModified) {
		this.lastModified = lastModified;
	}
		
}

	