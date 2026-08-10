package skillsync.ui;

import skillsync.model.Project;
import skillsync.model.Task;
import skillsync.model.User;
import skillsync.service.TaskService;

import java.util.Scanner;

public class TaskMenu {

    private Scanner sc = new Scanner(System.in);
    private TaskService taskService = new TaskService();

    public void show(Project project, User user) {

        while (true) {

            System.out.println("\n========== Project Tasks ==========");
            System.out.println("1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Mark Task Completed");
            System.out.println("4. Back");
            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    System.out.print("Enter Task Title: ");
                    String title = sc.nextLine();

                    Task task = new Task(title, user.getName());

                    taskService.addTask(project, task);

                    System.out.println("Task Added Successfully!");

                    break;

                case 2:

                    taskService.displayTasks(project);

                    break;

                case 3:

                    taskService.displayTasks(project);

                    System.out.print("\nEnter Task Number: ");
                    int taskNumber = sc.nextInt();
                    sc.nextLine();

                    taskService.markTaskCompleted(project, taskNumber);

                    break;

                case 4:

                    return;

                default:

                    System.out.println("Invalid Choice.");

            }

        }

    }

}
