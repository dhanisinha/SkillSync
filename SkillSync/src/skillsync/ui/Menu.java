package skillsync.ui;

import skillsync.model.User;
import skillsync.service.ClubService;
import skillsync.service.ProjectService;
import skillsync.service.UserService;

import java.util.Scanner;

public class Menu {

    private Scanner sc = new Scanner(System.in);

    private UserService userService;
    private ClubService clubService;
    private ProjectService projectService;

    public Menu(UserService userService,
                ClubService clubService,
                ProjectService projectService) {

        this.userService = userService;
        this.clubService = clubService;
        this.projectService = projectService;
    }

    public void showMainMenu() {

        while (true) {

            System.out.println("\n========== SkillSync ==========");
            System.out.println("1. Register");
            System.out.println("2. View Registered Users");
            System.out.println("3. Login");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    register();
                    break;

                case 2:
                    userService.displayAllUsers();
                    break;

                case 3:
                    login();
                    break;

                case 4:
                    System.out.println("Thank you for using SkillSync.");
                    return;

                default:
                    System.out.println("Invalid Choice.");
            }
        }
    }

    private void register() {

        String name;
        do {
            System.out.print("Enter Name: ");
            name = sc.nextLine().trim();

            if (name.isEmpty()) {
                System.out.println("Name cannot be empty.");
            }

        } while (name.isEmpty());

        String email;
        do {
            System.out.print("Enter Email: ");
            email = sc.nextLine().trim();

            if (email.isEmpty()) {
                System.out.println("Email cannot be empty.");
            }

        } while (email.isEmpty());

        String password;
        do {
            System.out.print("Enter Password: ");
            password = sc.nextLine().trim();

            if (password.isEmpty()) {
                System.out.println("Password cannot be empty.");
            }

        } while (password.isEmpty());

        User user = new User(
                userService.generateUserId(),
                name,
                email,
                password
        );

        if (userService.registerUser(user)) {

            System.out.println("\nRegistration Successful!");

        } else {

            System.out.println("\nEmail already registered!");

        }
    }

    private void login() {

        System.out.print("Enter Email: ");
        String email = sc.nextLine().trim();

        System.out.print("Enter Password: ");
        String password = sc.nextLine().trim();

        User user = userService.login(email, password);

        if (user == null) {

            System.out.println("\nInvalid Email or Password.");

        } else {

            DashboardMenu dashboardMenu =
                    new DashboardMenu(
                            userService,
                            clubService,
                            projectService
                    );

            dashboardMenu.show(user);
        }
    }
}