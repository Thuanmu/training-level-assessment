package com.thuanmu.traininglevelassessment.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "psychophysiology_factor")
public class PsychophysiologyFactor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
		
	@Column(name = "single_reflection_time")
	private Double singleReflectionTime;
	
	@Column(name = "living_capacity_quotient")
	private Double livingCapacityQuotient;
	
	@Column(name = "restored_heart_rate_at_30s_after_100m_run")
	private Double restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
	
	@Column(name = "lactic_acid_content_after_one_hundred_meters_run")
	private Double lacticAcidContentAfterOneHundredMetersRun;
	
	@Column(name = "status")
	private Character status;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "create_at", updatable=false)
	@CreationTimestamp
	private LocalDateTime createAt;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(name = "last_modified")
	@UpdateTimestamp
	private LocalDateTime lastModified;

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

	public Double getSingleReflectionTime() {
		return singleReflectionTime;
	}

	public void setSingleReflectionTime(Double singleReflectionTime) {
		this.singleReflectionTime = singleReflectionTime;
	}

	public Double getLivingCapacityQuotient() {
		return livingCapacityQuotient;
	}

	public void setLivingCapacityQuotient(Double livingCapacityQuotient) {
		this.livingCapacityQuotient = livingCapacityQuotient;
	}

	public Double getRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun() {
		return restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
	}

	public void setRestoredHeartRateAtThirtySecondsAfterOneHundredMetersRun(
			Double restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun) {
		this.restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun = restoredHeartRateAtThirtySecondsAfterOneHundredMetersRun;
	}

	public Double getLacticAcidContentAfterOneHundredMetersRun() {
		return lacticAcidContentAfterOneHundredMetersRun;
	}

	public void setLacticAcidContentAfterOneHundredMetersRun(Double lacticAcidContentAfterOneHundredMetersRun) {
		this.lacticAcidContentAfterOneHundredMetersRun = lacticAcidContentAfterOneHundredMetersRun;
	}

	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
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
