package com.emsi.hotel.entities;


import javax.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "available")
    private boolean available;

    @Column(name = "room_price")
    private double roomPrice;

    // Constructors, Getters, and Setters

    // Constructors
    public Room() {
    }

    public Room(String roomNumber, String roomType, boolean available, double roomPrice) {
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.available = available;
        this.roomPrice = roomPrice;
    }

    // Getters and Setters (omitted for brevity)

    public Long getId() {
        return id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(double roomPrice) {
        this.roomPrice = roomPrice;
    }
}


