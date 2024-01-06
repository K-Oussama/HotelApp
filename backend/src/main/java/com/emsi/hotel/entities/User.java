package com.emsi.hotel.entities;


import javax.persistence.*;



@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;

    // Constructors, Getters, and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }


    // Constructors
    public User() {
    }

    public User(String username, String email, String password, UserRole role) {
        this.username = generateUniqueUsername(name, id);
        this.email = email;
        this.password = password;
        this.role = role;
    }


    // Methods
    public String generateUniqueUsername(String name, Long id) {

        return name.replaceAll("\\s+", "") + id;
    }

    public enum UserRole {
        ADMIN,
        CLIENT
    }

    

}



