package skillsync.model;

public class DiscussionPost {

    private String author;
    private String message;

    public DiscussionPost(String author, String message) {
        this.author = author;
        this.message = message;
    }

    public String getAuthor() {
        return author;
    }

    public String getMessage() {
        return message;
    }
}
