package skillsync.model;

public class Task {

    private String title;
    private String assignedTo;
    private boolean completed;

    public Task(String title, String assignedTo) {

        this.title = title;
        this.assignedTo = assignedTo;
        this.completed = false;

    }

    public String getTitle() {
        return title;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void markCompleted() {
        completed = true;
    }

}