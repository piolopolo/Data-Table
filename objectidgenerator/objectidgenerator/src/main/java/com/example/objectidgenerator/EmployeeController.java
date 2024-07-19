package com.example.objectidgenerator;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class EmployeeController {

    private List<Employee> employees = new ArrayList<>();

    @GetMapping("/api/employees")
    public List<Employee> getEmployees() {
        return employees;
    }

    @PostMapping("/api/employees")
    public void saveEmployees(@RequestBody List<Employee> employees) {
        this.employees = employees;
    }
}