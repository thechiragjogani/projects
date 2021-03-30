# Code to find the duration of video based on the playback speed.
print("*" * 66)
print("* Program to find the duration of video based on playback speed. *")
print("*" * 66)
print()
hours = int(input("Enter the hours duration of video: "))
minutes = int(input("Enter the minutes duration of video: "))
seconds = int(input("Enter the seconds duration of video: "))
playback_rate = float(input("Enter the playback rate of the video: "))

original_length = (hours*3600) + (minutes*60) + seconds

new_length = (original_length // playback_rate)

new_hours = (new_length // 3600)
new_minutes = (new_length % 3600 // 60)
new_seconds = (new_length % 3600 % 60)
print()
print("The new duration of video is " + str(new_hours) + " hrs " +
      str(new_minutes) + " mins " + str(new_seconds) + " secs.")
