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
@Table(name = "technical_factor")
public class TechnicalFactor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
	
	@Column(name = "performance_difference")
	private Double performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
	
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

	public Double getPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed() {
		return performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
	}

	public void setPerformanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed(
			Double performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed) {
		this.performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed = performanceDifferenceBetweenThirtyMetersRunWithLowStartAndThirtyMetersRunAtHighSpeed;
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
