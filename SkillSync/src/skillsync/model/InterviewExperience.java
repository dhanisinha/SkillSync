package skillsync.model;

public class InterviewExperience {

    private String author;
    private String experience;

    public InterviewExperience(String author, String experience) {
        this.author = author;
        this.experience = experience;
    }

    public String getAuthor() {
        return author;
    }

    public String getExperience() {
        return experience;
    }
}
