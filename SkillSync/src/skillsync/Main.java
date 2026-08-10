package skillsync;

import skillsync.service.UserService;
import skillsync.service.ClubService;
import skillsync.service.ProjectService;
import skillsync.ui.Menu;

public class Main {

    public static void main(String[] args) {

        System.out.println("=================================");
        System.out.println("     Welcome to SkillSync");
        System.out.println("=================================");

        UserService userService = new UserService();
        ClubService clubService = new ClubService();
        ProjectService projectService = new ProjectService();

        Menu menu = new Menu(
                userService,
                clubService,
                projectService
        );

        menu.showMainMenu();
    }
}