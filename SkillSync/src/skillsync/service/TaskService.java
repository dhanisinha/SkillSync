package skillsync.service;

import skillsync.model.Project;
import skillsync.model.Task;

public class TaskService {

    public void addTask(Project project, Task task) {

        project.addTask(task);

    }

    public void displayTasks(Project project) {

        System.out.println("\n========== Project Tasks ==========");

        if (project.getTasks().isEmpty()) {

            System.out.println("No tasks available.");
            return;

        }

        int index = 1;

        for (Task task : project.getTasks()) {

            String status = task.isCompleted() ? "[✓]" : "[ ]";

            System.out.println(index + ". "
                    + status + " "
                    + task.getTitle()
                    + " - "
                    + task.getAssignedTo());

            index++;

        }

    }

    public void markTaskCompleted(Project project, int taskNumber) {

        if (taskNumber < 1 || taskNumber > project.getTasks().size()) {

            System.out.println("Invalid Task Number.");
            return;

        }

        project.getTasks().get(taskNumber - 1).markCompleted();

        System.out.println("Task marked as completed!");

    }

}
