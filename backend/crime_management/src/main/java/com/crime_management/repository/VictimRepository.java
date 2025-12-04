package com.crime_management.repository;

import com.crime_management.model.Victim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VictimRepository extends JpaRepository<Victim, Long> {}