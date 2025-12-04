package com.crime_management.repository;

import com.crime_management.model.Criminal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CriminalRepository extends JpaRepository<Criminal, Long> {}