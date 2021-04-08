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
@Table(name = "form_factor")
public class FormFactor {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
		
	@Column(name = "quetelet_quotient")
	private Double queteletQuotient;
	
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

	public Double getQueteletQuotient() {
		return queteletQuotient;
	}

	public void setQueteletQuotient(Double queteletQuotient) {
		this.queteletQuotient = queteletQuotient;
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
