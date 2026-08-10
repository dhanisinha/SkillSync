package skillsync.model;

public class ProjectResource {

    private String title;
    private String link;
    private String uploadedBy;

    public ProjectResource(String title,
                           String link,
                           String uploadedBy) {

        this.title = title;
        this.link = link;
        this.uploadedBy = uploadedBy;

    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

}