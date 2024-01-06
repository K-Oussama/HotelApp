package com.emsi.hotel.repositories;

import com.emsi.hotel.entities.Room;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    // Add custom methods for room-related operations

    public Room findByRoomNumber(String roomNumber);

    public Room findByRoomType(String roomType);

    public Room findByAvailable(boolean available);

    public Room findByRoomPrice(double roomPrice);

    // getAvailableRooms in a specific date range
   @Query("SELECT r FROM Room r WHERE r.id NOT IN "
            + "(SELECT res.room.id FROM Reservation res WHERE "
            + "res.startDate <= :endDate AND res.endDate >= :startDate)")
    List<Room> findAvailableRoomsForDates(@Param("startDate") LocalDate startDate,
                                          @Param("endDate") LocalDate endDate);

    // isRoomAvailableForDates in a specific date range
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Room r WHERE r.id NOT IN "
            + "(SELECT res.room.id FROM Reservation res WHERE "
            + "res.startDate <= :endDate AND res.endDate >= :startDate) AND r.id = :roomId")
    boolean isRoomAvailableForDates(@Param("roomId") Long roomId,
                        @Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate);



    
}

