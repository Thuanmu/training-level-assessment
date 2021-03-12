package com.thuanmu.traininglevelassessment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "psychophysiology_factor")
public class PsychophysiologyFactor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
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
