package com.emsi.hotel.controllers;

import com.emsi.hotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // CRUD methods for Room entity similar to UserController
    // GET, POST, PUT, DELETE mappings

    // Get all rooms
    @GetMapping
    public List<com.emsi.hotel.entities.Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // getAvailableRooms in a specific date range
    @GetMapping("/available")
    public List<com.emsi.hotel.entities.Room> getAvailableRooms(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return roomRepository.findAvailableRoomsForDates(startDate, endDate);
    }

    // Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<com.emsi.hotel.entities.Room> getRoomById(@PathVariable Long id) {
        com.emsi.hotel.entities.Room room = roomRepository.findById(id)
                .orElseThrow(() -> new com.emsi.hotel.exceptions.ResourceNotFoundException("Room not found with id: " + id));
        return ResponseEntity.ok(room);
    }

    // Create a new room
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<com.emsi.hotel.entities.Room> createRoom(@RequestBody com.emsi.hotel.entities.Room room) {
        com.emsi.hotel.entities.Room createdRoom = roomRepository.save(room);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }





    // Update room details
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<com.emsi.hotel.entities.Room> updateRoom(@PathVariable Long id, @RequestBody com.emsi.hotel.entities.Room roomDetails) {
        com.emsi.hotel.entities.Room room = roomRepository.findById(id)
                .orElseThrow(() -> new com.emsi.hotel.exceptions.ResourceNotFoundException("Room not found with id: " + id));

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setRoomType(roomDetails.getRoomType());
        room.setAvailable(roomDetails.isAvailable());
        room.setRoomPrice(roomDetails.getRoomPrice());

        com.emsi.hotel.entities.Room updatedRoom = roomRepository.save(room);
        return ResponseEntity.ok(updatedRoom);
    }

    // Delete room
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        com.emsi.hotel.entities.Room room = roomRepository.findById(id)
                .orElseThrow(() -> new com.emsi.hotel.exceptions.ResourceNotFoundException("Room not found with id: " + id));

        roomRepository.delete(room);
        return ResponseEntity.ok().build();
    }

    

}
