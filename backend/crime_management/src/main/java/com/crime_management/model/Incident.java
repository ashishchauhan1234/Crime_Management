package com.crime_management.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
@Getter @Setter @NoArgsConstructor
public class Incident {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long incidentId;

    @Column(length = 100)
    private String reportedBy; // public/officer name or id reference

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(length = 255)
    private String location;

    @Column(length = 20)
    private String status = "Reported";

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}