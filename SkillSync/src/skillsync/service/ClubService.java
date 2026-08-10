package skillsync.service;

import skillsync.model.Club;
import skillsync.model.User;

import java.util.ArrayList;
import java.util.List;

public class ClubService {

    private List<Club> clubs;
    private int nextClubId;

    public ClubService() {
        clubs = new ArrayList<>();
        nextClubId = 1;
    }

    // Generate Club ID
    public int generateClubId() {
        return nextClubId++;
    }

    // Create Club
    public void createClub(Club club) {
        clubs.add(club);
    }
    public boolean clubExists(String clubName) {

        for (Club club : clubs) {

            if (club.getClubName().equalsIgnoreCase(clubName)) {
                return true;
            }

        }

        return false;

    }
    // Return all clubs
    public List<Club> getAllClubs() {
        return clubs;
    }

    // Find club by ID
    public Club findClubById(int clubId) {

        for (Club club : clubs) {

            if (club.getClubId() == clubId) {
                return club;
            }
        }

        return null;
    }

    // Join Club
    public boolean joinClub(User user, Club club) {

        if (club.hasMember(user)) {
            return false;
        }

        club.addMember(user);
        return true;
    }

    // Get clubs available to explore
    public List<Club> getExploreClubs(User user) {

        List<Club> exploreClubs = new ArrayList<>();

        for (Club club : clubs) {

            if (!club.hasMember(user)) {
                exploreClubs.add(club);
            }

        }

        return exploreClubs;
    }

    // Display all clubs
    public void displayAllClubs() {

        if (clubs.isEmpty()) {
            System.out.println("No clubs available.");
            return;
        }

        System.out.println("\n===== Available Clubs =====");

        for (Club club : clubs) {

            System.out.println("ID          : " + club.getClubId());
            System.out.println("Club Name   : " + club.getClubName());
            System.out.println("Company     : " + club.getCompanyName());
            System.out.println("Description : " + club.getDescription());
            System.out.println("Creator     : " + club.getCreator().getName());
            System.out.println("Members     : " + club.getMembers().size());
            System.out.println("------------------------------");

        }

    }

    // Display Explore Clubs
    public void displayExploreClubs(User user) {

        System.out.println("\n========== Explore Clubs ==========");

        List<Club> exploreClubs = getExploreClubs(user);

        if (exploreClubs.isEmpty()) {
            System.out.println("No clubs available to join.");
            return;
        }

        for (Club club : exploreClubs) {

            System.out.println("Club ID     : " + club.getClubId());
            System.out.println("Club Name   : " + club.getClubName());
            System.out.println("Company     : " + club.getCompanyName());
            System.out.println("Creator     : " + club.getCreator().getName());
            System.out.println("Members     : " + club.getMembers().size());
            System.out.println("------------------------------");

        }

    }

    // Display My Clubs
    public void displayUserClubs(User user) {

        System.out.println("\n========== My Clubs ==========");

        boolean found = false;

        for (Club club : clubs) {

            if (club.hasMember(user)) {

                System.out.println("Club ID     : " + club.getClubId());
                System.out.println("Club Name   : " + club.getClubName());
                System.out.println("Company     : " + club.getCompanyName());
                System.out.println("Creator     : " + club.getCreator().getName());
                System.out.println("Description : " + club.getDescription());
                System.out.println("Members     : " + club.getMembers().size());
                System.out.println("------------------------------");

                found = true;

            }

        }

        if (!found) {
            System.out.println("You haven't joined any clubs yet.");
        }

    }

    // Display Members
    public void displayClubMembers(Club club) {

        System.out.println("\n===== Members of " + club.getClubName() + " =====");

        if (club.getMembers().isEmpty()) {
            System.out.println("No members in this club.");
            return;
        }

        for (User user : club.getMembers()) {
            System.out.println("- " + user.getName());
        }

    }

}