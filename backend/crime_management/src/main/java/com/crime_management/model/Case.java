package com.crime_management.model;

import com.crime_management.domain.CaseStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cases")
@Getter @Setter @NoArgsConstructor
public class Case {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long caseId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CaseStatus status = CaseStatus.Pending;

    @ManyToOne
    @JoinColumn(name = "officer_id")
    private Officer assignedOfficer;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}