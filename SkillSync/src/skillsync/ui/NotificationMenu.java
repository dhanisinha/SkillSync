package skillsync.ui;

import skillsync.service.NotificationService;

public class NotificationMenu {

    private NotificationService notificationService;

    public NotificationMenu(NotificationService notificationService) {

        this.notificationService = notificationService;

    }

    public void show() {

        notificationService.displayNotifications();

    }

}