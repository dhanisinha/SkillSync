package skillsync.service;

import skillsync.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserService {

    private List<User> users;
    private int nextUserId;

    public UserService() {

        users = new ArrayList<>();
        nextUserId = 1;

    }

    public int generateUserId() {
        return nextUserId++;
    }

    // Register User
    public boolean registerUser(User user) {

        for (User existingUser : users) {

            if (existingUser.getEmail().equalsIgnoreCase(user.getEmail())) {
                return false;
            }

        }

        users.add(user);
        return true;
    }

    // Return all users
    public List<User> getAllUsers() {
        return users;
    }

    // Display all users
    public void displayAllUsers() {

        if (users.isEmpty()) {

            System.out.println("No users registered.");
            return;

        }

        System.out.println("\n===== Registered Users =====");

        for (User user : users) {

            System.out.println("ID    : " + user.getUserId());
            System.out.println("Name  : " + user.getName());
            System.out.println("Email : " + user.getEmail());
            System.out.println("--------------------------");

        }

    }

    // Login
    public User login(String email, String password) {

        for (User user : users) {

            if (user.getEmail().equalsIgnoreCase(email)
                    && user.getPassword().equals(password)) {

                return user;

            }

        }

        return null;

    }

}