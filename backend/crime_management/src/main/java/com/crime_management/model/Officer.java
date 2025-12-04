package com.crime_management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "officers")
@Getter @Setter @NoArgsConstructor
public class Officer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long officerId;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 50)
    private String rank;

    @Column(length = 100)
    private String department;

    @Column(length = 100)
    private String contact;
}