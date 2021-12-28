# Program to find the duration of video based on the playback speed.
from sys import argv
try:
    hours = int(argv[1])
    minutes = int(argv[2])
    seconds = int(argv[3])
    playbackRate = float(argv[4])

    originalLength = (hours*3600) + (minutes*60) + seconds

    newLength = (originalLength // playbackRate)

    newHours = (newLength // 3600)
    newMinutes = (newLength % 3600 // 60)
    newSeconds = (newLength % 3600 % 60)
    print(f"\nThe new duration of video is {newHours} hrs {newMinutes} mins {newSeconds} secs.")

except (Exception, ValueError) as e:
    print("\nUsage - newTime.py <hours> <minutes> <seconds> <playbackRate>")
