package com.thuanmu.traininglevelassessment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



@Entity
@Table(name = "athlete")
public class Athlete {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
		
	@Column(name = "athlete_name", length = 255)
	private String athleteName;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "date_of_birth")
	private Date dateOfBirth;
	
	@Column(name = "hometown", length = 50)
	private String hometown;
	
	@Column(name = "total_scores_of_criterias", length = 3)
	private Long totalScoresOfCriterias;
	
	@Column(name = "grade", length = 50)
	private String grade;
	
	@Column(name = "athlete_rank", length = 50)
	private String athleteRank;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_at")
	private Date createAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_modified")
	private Date lastModified;
		
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
	public String getHometown() {
		return hometown;
	}

	public void setHometown(String hometown) {
		this.hometown = hometown;
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

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	
}

	