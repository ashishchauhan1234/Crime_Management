package com.crime_management.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "criminals")
@Getter @Setter @NoArgsConstructor
public class Criminal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long criminalId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String alias;

    private LocalDate dob;

    @Column(length = 20)
    private String gender; // Male/Female/Other

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String crimeHistory;
}