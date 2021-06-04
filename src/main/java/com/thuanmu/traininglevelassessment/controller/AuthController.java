package com.thuanmu.traininglevelassessment.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thuanmu.traininglevelassessment.entity.ERole;
import com.thuanmu.traininglevelassessment.entity.Role;
import com.thuanmu.traininglevelassessment.entity.User;
import com.thuanmu.traininglevelassessment.payload.request.LoginRequest;
import com.thuanmu.traininglevelassessment.payload.request.SignupRequest;
import com.thuanmu.traininglevelassessment.payload.response.JwtResponse;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.RoleRepository;
import com.thuanmu.traininglevelassessment.repository.UserRepository;
import com.thuanmu.traininglevelassessment.security.jwt.JwtUtils;
import com.thuanmu.traininglevelassessment.security.services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
//		String StrUser =  (userRepository.findByUsername(loginRequest.getUsername())).toString();
//		if (StrUser == null) {
//			return ResponseEntity
//					.badRequest()
//					.body(new MessageResponse("User Not Found with username: " + loginRequest.getUsername()));
//		}
		
		Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
		String athleteCodeUsed = null;
		Integer status = null;
		if (user.isPresent()) {
			athleteCodeUsed = user.get().getAthleteCodeUsed();
			status = user.get().getStatus();
		}
		else {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("User Not Found with username: " + loginRequest.getUsername()));
		}
		
		if (status == 0) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User has been locked!"));
		}
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles,
												 athleteCodeUsed,
												 status
												 ));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role coachRole = roleRepository.findByName(ERole.ROLE_COACH)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(coachRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "ROLE_ADMIN":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
					
				case "ROLE_COACH":
					Role coachRole = roleRepository.findByName(ERole.ROLE_COACH)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(coachRole);
					break;
					
				default:
					Role athleteRole = roleRepository.findByName(ERole.ROLE_ATHLETE)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(athleteRole);
				}
			});
		}

		String athleteCodeUsed = signUpRequest.getAthleteCodeUsed();
		if (athleteCodeUsed != null) {
			user.setAthleteCodeUsed(athleteCodeUsed);
		}
		
		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}