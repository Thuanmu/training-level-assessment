package com.thuanmu.traininglevelassessment.entity;

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

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A TechnicalFactor.
 */
@Entity
@Table(name = "technical_factor")
public class TechnicalFactor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@Column(name = "technical_factor_code", length = 255, nullable = false, unique = true)
	private String technicalFactorCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
		
	@Column(name = "performance_difference")
	private Double performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
	
	@Column(name = "grounding_time_when_reaching_high_speed")
	private Double groundingTimeWhenReachingHighSpeed;
	
	@Column(name = "status", length = 1)
	private Integer status;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "create_at", updatable=false)
	@CreationTimestamp
	private LocalDateTime createAt;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "technicalFactor", cascade = CascadeType.REMOVE)
	private Set<AthleteClassification> listAthleteClassification = new HashSet<>();
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTechnicalFactorCode() {
		return technicalFactorCode;
	}

	public void setTechnicalFactorCode(String technicalFactorCode) {
		this.technicalFactorCode = technicalFactorCode;
	}

	public Athlete getAthlete() {
		return athlete;
	}

	public void setAthlete(Athlete athlete) {
		this.athlete = athlete;
	}

	public Double getPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed() {
		return performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
	}

	public void setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(
			Double performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed) {
		this.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
	}
	
	public Double getGroundingTimeWhenReachingHighSpeed() {
		return groundingTimeWhenReachingHighSpeed;
	}

	public void setGroundingTimeWhenReachingHighSpeed(Double groundingTimeWhenReachingHighSpeed) {
		this.groundingTimeWhenReachingHighSpeed = groundingTimeWhenReachingHighSpeed;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}
}
