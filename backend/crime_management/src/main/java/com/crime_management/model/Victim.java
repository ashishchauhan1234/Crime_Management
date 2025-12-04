package com.crime_management.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "victims")
@Getter @Setter @NoArgsConstructor
public class Victim {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long victimId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    private Case caseRef;

    @Column(nullable = false, length = 100)
    private String name;

    private LocalDate dob;

    @Column(length = 100)
    private String contact;

    @Column(columnDefinition = "TEXT")
    private String statement;
}