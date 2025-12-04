package com.crime_management.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evidence")
@Getter @Setter @NoArgsConstructor
public class Evidence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evidenceId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    private Case caseRef;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String filePath;

    @Column(nullable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();
}