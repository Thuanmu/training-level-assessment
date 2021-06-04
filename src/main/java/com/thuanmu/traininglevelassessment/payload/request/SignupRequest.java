package com.thuanmu.traininglevelassessment.payload.request;

import java.util.Set;

import javax.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    @NotBlank
    @Size(max = 255)
    private String athleteCodeUsed;
    
    @NotBlank
    @Size(max = 1)
    private Integer status;
    
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getAthleteCodeUsed() {
		return athleteCodeUsed;
	}

	public void setAthleteCodeUsed(String athleteCodeUsed) {
		this.athleteCodeUsed = athleteCodeUsed;
	}

	public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRoles(Set<String> roles) {
      this.roles = roles;
    }

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}