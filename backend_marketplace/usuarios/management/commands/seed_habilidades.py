from django.core.management.base import BaseCommand

from usuarios.models import Habilidad

SKILLS = [
    "Python", "JavaScript", "TypeScript", "React", "Next.js", "Django",
    "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "Git",
    "Figma", "Adobe Photoshop", "Adobe Illustrator", "UI/UX Design",
    "SEO", "Google Analytics", "Content Marketing", "Copywriting",
    "Video Editing", "Motion Graphics", "3D Modeling", "Blender",
    "Project Management", "Scrum", "Agile", "Data Analysis",
    "Machine Learning", "TensorFlow", "Power BI", "Excel Avanzado",
    "Redacción Creativa", "Traducción", "Community Management",
    "Email Marketing", "Google Ads", "Facebook Ads", "WordPress",
    "Shopify", "Flutter", "Swift", "Kotlin", "Java", "C#",
    "Unity", "Unreal Engine", "Cybersecurity", "DevOps", "Linux",
    "Go", "Rust", "Vue.js", "Angular", "Tailwind CSS",
    "GraphQL", "REST APIs", "Firebase", "Supabase", "Redis",
]


class Command(BaseCommand):
    help = 'Seed the database with professional skills'

    def handle(self, *args, **options):
        created = 0
        for nombre in SKILLS:
            _, was_created = Habilidad.objects.get_or_create(nombre=nombre)
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f'Created {created} skills ({len(SKILLS)} total)'))
