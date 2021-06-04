package com.thuanmu.traininglevelassessment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@Table(name = "athlete")
public class Athlete {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11, nullable = false)
	private Long id;
	
	@Column(name = "athlete_code", length = 255, nullable = false, unique = true)
	private String athleteCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "coach_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
	
	@Column(name = "athlete_name", length = 255)
	private String athleteName;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;
	
	@Size(max = 1)
	@Column(name = "gender", length = 1, nullable = false)
	private Integer gender;
	
	@Column(name = "hometown", length = 50)
	private String hometown;
	
	@Column(name = "total_scores_of_criterias", length = 3)
	private Double totalScoresOfCriterias;
	
	@Column(name = "grade", length = 50)
	private String grade;
	
	@Column(name = "athlete_rank", length = 50)
	private String athleteRank;
	
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "create_at", updatable=false)
	@CreationTimestamp
	private LocalDateTime createAt;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "last_modified")
	@UpdateTimestamp
	private LocalDateTime lastModified;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "athlete", cascade = CascadeType.REMOVE)
	private Set<PhysicalFactor> listPhysicalFactor = new HashSet<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "athlete", cascade = CascadeType.REMOVE)
	private Set<TechnicalFactor> listTechnicalFactor = new HashSet<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "athlete", cascade = CascadeType.REMOVE)
	private Set<PsychophysiologyFactor> listPsychophysiologyFactor = new HashSet<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "athlete", cascade = CascadeType.REMOVE)
	private Set<FormFactor> listFormFactor = new HashSet<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "athlete", cascade = CascadeType.REMOVE)
	private Set<AthleteClassification> listAthleteClassification = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
		
	public String getAthleteCode() {
		return athleteCode;
	}

	public void setAthleteCode(String athleteCode) {
		this.athleteCode = athleteCode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
	
	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
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

//	public Set<PhysicalFactor> getListPhysicalFactor() {
//		return listPhysicalFactor;
//	}
//
//	public void setListPhysicalFactor(Set<PhysicalFactor> listPhysicalFactor) {
//		this.listPhysicalFactor = listPhysicalFactor;
//	}
	
}

	