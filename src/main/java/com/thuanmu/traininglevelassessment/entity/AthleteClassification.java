package com.thuanmu.traininglevelassessment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A AthleteClassification.
 */
@Entity
@Table(name = "athlete_classification")
public class AthleteClassification {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11, nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
		
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "physical_factor_id", referencedColumnName = "id", nullable = false, unique = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private PhysicalFactor physicalFactor;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "technical_factor_id", referencedColumnName = "id", nullable = false, unique = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TechnicalFactor technicalFactor;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "psychophysiology_factor_id", referencedColumnName = "id", nullable = false, unique = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private PsychophysiologyFactor psychophysiologyFactor;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "form_factor_id", referencedColumnName = "id", nullable = false, unique = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private FormFactor formFactor;
		
	@Column(name = "total_scores_of_criterias", length = 3)
	private Double totalScoresOfCriterias;
	
	@Column(name = "grade", length = 50)
	private String grade;
	
	@Column(name = "athlete_rank", length = 50)
	private Integer athleteRank;
	
	@Column(name = "athlete_count", length = 50)
	private Integer athleteCount;
	
//	@JsonFormat(pattern = "MM-yyyy")
	@JsonFormat(pattern = "dd-MM-yyyy")
	@Column(name = "create_at", updatable=false)
	@CreationTimestamp
	private LocalDate createAt;
	

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

	public PhysicalFactor getPhysicalFactor() {
		return physicalFactor;
	}

	public void setPhysicalFactor(PhysicalFactor physicalFactor) {
		this.physicalFactor = physicalFactor;
	}

	public TechnicalFactor getTechnicalFactor() {
		return technicalFactor;
	}

	public void setTechnicalFactor(TechnicalFactor technicalFactor) {
		this.technicalFactor = technicalFactor;
	}

	public PsychophysiologyFactor getPsychophysiologyFactor() {
		return psychophysiologyFactor;
	}

	public void setPsychophysiologyFactor(PsychophysiologyFactor psychophysiologyFactor) {
		this.psychophysiologyFactor = psychophysiologyFactor;
	}

	public FormFactor getFormFactor() {
		return formFactor;
	}

	public void setFormFactor(FormFactor formFactor) {
		this.formFactor = formFactor;
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

	public Integer getAthleteRank() {
		return athleteRank;
	}

	public void setAthleteRank(Integer athleteRank) {
		this.athleteRank = athleteRank;
	}

	public Integer getAthleteCount() {
		return athleteCount;
	}

	public void setAthleteCount(Integer athleteCount) {
		this.athleteCount = athleteCount;
	}

	public LocalDate getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDate createAt) {
		this.createAt = createAt;
	}
}
