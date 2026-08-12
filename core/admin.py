from django.contrib import admin

from .models import (
    Project,
    Technology,
    ProjectFeature,
    ProjectImage,
)


class ProjectFeatureInline(admin.TabularInline):
    model = ProjectFeature
    extra = 1


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
    "title",
    "icon",
    "github_link",
    "created_at",
)

    search_fields = (
        "title",
        "short_description",
    )

    list_filter = (
        "created_at",
        "technologies",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    filter_horizontal = (
        "technologies",
    )

    inlines = [
        ProjectFeatureInline,
        ProjectImageInline,
    ]


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):

    list_display = (
        "name",
    )

    search_fields = (
        "name",
    )


@admin.register(ProjectFeature)
class ProjectFeatureAdmin(admin.ModelAdmin):

    list_display = (
        "project",
        "title",
    )

    search_fields = (
        "title",
    )


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):

    list_display = (
        "project",
        "caption",
    )

    search_fields = (
        "project__title",
        "caption",
    )