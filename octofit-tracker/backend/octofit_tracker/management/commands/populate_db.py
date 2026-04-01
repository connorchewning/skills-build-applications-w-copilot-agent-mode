from django.core.management.base import BaseCommand
from django.conf import settings

# Sample data for superheroes, teams, activities, leaderboard, and workouts
def get_sample_data():
    users = [
        {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
        {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
        {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
        {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
        {"name": "Black Widow", "email": "widow@marvel.com", "team": "Marvel"},
    ]
    teams = [
        {"name": "Marvel", "members": [u["email"] for u in users if u["team"] == "Marvel"]},
        {"name": "DC", "members": [u["email"] for u in users if u["team"] == "DC"]},
    ]
    activities = [
        {"user_email": "superman@dc.com", "activity": "Flight", "duration": 60},
        {"user_email": "batman@dc.com", "activity": "Martial Arts", "duration": 45},
        {"user_email": "ironman@marvel.com", "activity": "Suit Test", "duration": 30},
        {"user_email": "cap@marvel.com", "activity": "Shield Training", "duration": 50},
    ]
    leaderboard = [
        {"team": "Marvel", "points": 150},
        {"team": "DC", "points": 120},
    ]
    workouts = [
        {"name": "Strength Training", "suggested_for": "Marvel"},
        {"name": "Agility Drills", "suggested_for": "DC"},
    ]
    return users, teams, activities, leaderboard, workouts

from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        users, teams, activities, leaderboard, workouts = get_sample_data()

        # Delete all data
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Insert users
        user_objs = {}
        for u in users:
            obj = User.objects.create(name=u["name"], email=u["email"], team=u["team"])
            user_objs[u["email"]] = obj

        # Insert teams and assign members
        for t in teams:
            team_obj = Team.objects.create(name=t["name"])
            members = [user_objs[email] for email in t["members"]]
            team_obj.members.set(members)
            team_obj.save()

        # Insert activities
        for a in activities:
            Activity.objects.create(user=user_objs[a["user_email"]], activity=a["activity"], duration=a["duration"])

        # Insert leaderboard
        for l in leaderboard:
            Leaderboard.objects.create(team=l["team"], points=l["points"])

        # Insert workouts
        for w in workouts:
            Workout.objects.create(name=w["name"], suggested_for=w["suggested_for"])

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
