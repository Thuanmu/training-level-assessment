package com.thuanmu.traininglevelassessment.payload.request;

import javax.validation.constraints.NotBlank;

/**
 * A LoginRequest.
 *
 */
public class LoginRequest {
	@NotBlank
	private String username;

	@NotBlank
	private String password;
	
	@NotBlank
	private Integer status;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}