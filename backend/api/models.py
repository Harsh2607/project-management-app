from django.db import models

class ProjectManager(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Employees(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(unique=True, max_length=255)
    employees = models.ManyToManyField(Employees, blank=True)
    project_manager = models.ForeignKey(ProjectManager, on_delete=models.CASCADE, null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.TextField(null=True, blank=True, max_length=500)
    status = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
