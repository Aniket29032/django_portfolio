from django.db import models

class Technology(models.Model):

    name = models.CharField(max_length=100, unique=True)

    icon = models.CharField(
        max_length=50,
        blank=True
    )

    image = models.ImageField(
        upload_to="technology_icons/",
        blank=True,
        null=True
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class Project(models.Model):

    title = models.CharField(max_length=200)

    slug = models.SlugField(unique=True)

    short_description = models.TextField()

    full_description = models.TextField()

    github_link = models.URLField(blank=True)

    image = models.ImageField(
        upload_to="projects/",
        help_text="Cover image shown on project page"
    )

    icon = models.CharField(
    max_length=50,
    default="fa-code",
    help_text="Example: fa-users, fa-motorcycle, fa-robot"
)

    technologies = models.ManyToManyField(
        Technology,
        blank=True,
        related_name="projects"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class ProjectFeature(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="features"
    )

    title = models.CharField(max_length=200)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title


class ProjectImage(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="screenshots"
    )

    image = models.ImageField(
        upload_to="projects/screenshots/"
    )

    caption = models.CharField(
        max_length=150,
        blank=True
    )

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.project.title} - Screenshot"