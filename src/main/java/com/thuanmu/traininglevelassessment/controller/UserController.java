package com.thuanmu.traininglevelassessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.thuanmu.traininglevelassessment.entity.ERole;
import com.thuanmu.traininglevelassessment.entity.Role;
import com.thuanmu.traininglevelassessment.entity.User;
import com.thuanmu.traininglevelassessment.payload.response.MessageResponse;
import com.thuanmu.traininglevelassessment.repository.RoleRepository;
import com.thuanmu.traininglevelassessment.repository.UserRepository;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
	
private final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	public UserController(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	// get all users
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers(
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
            ) {
    	
    	try {
    	      List<User> users = new ArrayList<User>();
    	      Pageable paging = PageRequest.of(page, size);
    	      
    	      Page<User> pageUsers = userRepository.findAll(paging); 	       
    	      users = pageUsers.getContent();

    	      Map<String, Object> response = new HashMap<>();
    	      response.put("users", users);
    	      response.put("currentPage", pageUsers.getNumber());
    	      response.put("totalItems", pageUsers.getTotalElements());
    	      response.put("totalPages", pageUsers.getTotalPages());

    	      return new ResponseEntity<>(response, HttpStatus.OK);
    	      
    	    } catch (Exception e) {
    	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }
    
    // get user by id rest api
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // create user rest api
    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) throws URISyntaxException {
        log.info("Request to create user: {}", user);
        
        if (userRepository.existsByUsername(user.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(user.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		Set<Role> roles = new HashSet<>();
		
		user.getRoles().forEach(role -> {
			switch (role.getName().toString()) {
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

		user.setRoles(roles);
		user.setPassword(encoder.encode(user.getPassword()));        
        User result = userRepository.save(user);
        return ResponseEntity.created(new URI("/api/users/" + result.getId()))
        		.body(new MessageResponse("User have been added!"));
    }
    
    // update user rest api
    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user) {
        log.info("Request to update user: {}", user);
        userRepository.save(user);
        return ResponseEntity.ok().body(new MessageResponse("User have been edited!"));
    }
    
    // delete user rest api
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        log.info("Request to delete user: {}", id);
        userRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("User has been deleted!"));
    }
    
}
