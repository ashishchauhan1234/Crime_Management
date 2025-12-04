package com.crime_management.controller;

import com.crime_management.model.Case;
import com.crime_management.repository.CaseRepository;
import com.crime_management.domain.CaseStatus;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/officer/cases")
public class CaseController {
    private final CaseRepository caseRepo;

    public CaseController(CaseRepository caseRepo) {
        this.caseRepo = caseRepo;
    }

    @PostMapping
    public ResponseEntity<Case> create(@RequestParam @NotBlank String title,
                                       @RequestParam(required = false) String description) {
        Case c = new Case();
        c.setTitle(title);
        c.setDescription(description);
        c.setStatus(CaseStatus.Pending);
        return ResponseEntity.ok(caseRepo.save(c));
    }

    @GetMapping
    public ResponseEntity<List<Case>> list() {
        return ResponseEntity.ok(caseRepo.findAll());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Case> updateStatus(@PathVariable Long id,
                                             @RequestParam CaseStatus status) {
        Case c = caseRepo.findById(id).orElseThrow();
        c.setStatus(status);
        return ResponseEntity.ok(caseRepo.save(c));
    }
}