package com.thuanmu.traininglevelassessment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thuanmu.traininglevelassessment.entity.ERole;
import com.thuanmu.traininglevelassessment.entity.Role;

/**
 * Spring Data JPA repository for the Role entity.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}