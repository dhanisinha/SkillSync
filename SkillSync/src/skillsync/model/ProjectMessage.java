package skillsync.model;

public class ProjectMessage {

    private String sender;
    private String message;

    public ProjectMessage(String sender, String message) {

        this.sender = sender;
        this.message = message;

    }

    public String getSender() {
        return sender;
    }

    public String getMessage() {
        return message;
    }

}
