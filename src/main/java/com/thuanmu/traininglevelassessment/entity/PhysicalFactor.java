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
@Table(name = "physical_factor")
public class PhysicalFactor {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "athlete_id", referencedColumnName = "id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Athlete athlete;
	
	@Column(name = "time_of_reflection_start")
	private Double timeOfReflectionStart;
	
	@Column(name = "thirty_meters_run_at_high_speed")
	private Double thirtyMetersRunAtHighSpeed;
	
	@Column(name = "thirty_meters_run_with_Low_start")
	private Double thirtyMetersRunWithLowStart;
	
	@Column(name = "sixty_meters_run_with_low_start")
	private Double sixtyMetersRunWithLowStart;
	
	@Column(name = "eighty_meters_run_with_high_start")
	private Double eightyMetersRunWithHighStart;
	
	@Column(name = "one_hundred_fifty_meters_run_with_high_start")
	private Double oneHundredFiftyMetersRunWithHighStart;
	
	@Column(name = "away_jump_in_place")
	private Double awayJumpInPlace;
	
	@Column(name = "three_steps_jump_in_place")
	private Double threeStepsJumpInPlace;
	
	@Column(name = "ten_steps_jump_in_place")
	private Double tenStepsJumpInPlace;
	
	@Column(name = "run_time_of_last_twenty_meters_in_one_hundred_meters_run")
	private Double runTimeOfLastTwentyMetersInOneHundredMetersRun;
	
	@Column(name = "strength_coefficient_K")
	private Double strengthCoefficient_K;
	
	@Column(name = "thighs_raise_in_place_for_ten_seconds")
	private Double thighsRaiseInPlaceForTenSeconds;
	
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

	public Double getTimeOfReflectionStart() {
		return timeOfReflectionStart;
	}

	public void setTimeOfReflectionStart(Double timeOfReflectionStart) {
		this.timeOfReflectionStart = timeOfReflectionStart;
	}

	public Double getThirtyMetersRunAtHighSpeed() {
		return thirtyMetersRunAtHighSpeed;
	}

	public void setThirtyMetersRunAtHighSpeed(Double thirtyMetersRunAtHighSpeed) {
		this.thirtyMetersRunAtHighSpeed = thirtyMetersRunAtHighSpeed;
	}

	public Double getThirtyMetersRunWithLowStart() {
		return thirtyMetersRunWithLowStart;
	}

	public void setThirtyMetersRunWithLowStart(Double thirtyMetersRunWithLowStart) {
		this.thirtyMetersRunWithLowStart = thirtyMetersRunWithLowStart;
	}

	public Double getSixtyMetersRunWithLowStart() {
		return sixtyMetersRunWithLowStart;
	}

	public void setSixtyMetersRunWithLowStart(Double sixtyMetersRunWithLowStart) {
		this.sixtyMetersRunWithLowStart = sixtyMetersRunWithLowStart;
	}

	public Double getEightyMetersRunWithHighStart() {
		return eightyMetersRunWithHighStart;
	}

	public void setEightyMetersRunWithHighStart(Double eightyMetersRunWithHighStart) {
		this.eightyMetersRunWithHighStart = eightyMetersRunWithHighStart;
	}

	public Double getOneHundredFiftyMetersRunWithHighStart() {
		return oneHundredFiftyMetersRunWithHighStart;
	}

	public void setOneHundredFiftyMetersRunWithHighStart(Double oneHundredFiftyMetersRunWithHighStart) {
		this.oneHundredFiftyMetersRunWithHighStart = oneHundredFiftyMetersRunWithHighStart;
	}

	public Double getAwayJumpInPlace() {
		return awayJumpInPlace;
	}

	public void setAwayJumpInPlace(Double awayJumpInPlace) {
		this.awayJumpInPlace = awayJumpInPlace;
	}

	public Double getThreeStepsJumpInPlace() {
		return threeStepsJumpInPlace;
	}

	public void setThreeStepsJumpInPlace(Double threeStepsJumpInPlace) {
		this.threeStepsJumpInPlace = threeStepsJumpInPlace;
	}

	public Double getTenStepsJumpInPlace() {
		return tenStepsJumpInPlace;
	}

	public void setTenStepsJumpInPlace(Double tenStepsJumpInPlace) {
		this.tenStepsJumpInPlace = tenStepsJumpInPlace;
	}

	public Double getRunTimeOfLastTwentyMetersInOneHundredMetersRun() {
		return runTimeOfLastTwentyMetersInOneHundredMetersRun;
	}

	public void setRunTimeOfLastTwentyMetersInOneHundredMetersRun(Double runTimeOfLastTwentyMetersInOneHundredMetersRun) {
		this.runTimeOfLastTwentyMetersInOneHundredMetersRun = runTimeOfLastTwentyMetersInOneHundredMetersRun;
	}

	public Double getStrengthCoefficient_K() {
		return strengthCoefficient_K;
	}

	public void setStrengthCoefficient_K(Double strengthCoefficient_K) {
		this.strengthCoefficient_K = strengthCoefficient_K;
	}

	public Double getThighsRaiseInPlaceForTenSeconds() {
		return thighsRaiseInPlaceForTenSeconds;
	}

	public void setThighsRaiseInPlaceForTenSeconds(Double thighsRaiseInPlaceForTenSeconds) {
		this.thighsRaiseInPlaceForTenSeconds = thighsRaiseInPlaceForTenSeconds;
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
