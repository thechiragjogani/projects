#include <stdio.h>
#include <conio.h>

void main()
{
    int original_length, hours, minutes, seconds, new_length, new_hours, new_minutes, new_seconds;
    float playback_rate;
    printf("Enter the hours duration of video: ");
    scanf("%d", &hours);
    printf("Enter the minutes duration of video: ");
    scanf("%d", &minutes);
    printf("Enter the seconds duration of video: ");
    scanf("%d", &seconds);
    printf("Enter the playback rate of the video: ");
    scanf("%f", &playback_rate);

    original_length = (hours * 3600) + (minutes * 60) + seconds;
    new_length = (original_length / playback_rate);
    new_hours = (new_length / 3600);
    new_minutes = (new_length % 3600 / 60);
    new_seconds = (new_length % 3600 % 60);

    printf("The new duration of the video is: %d hrs %d mins %d secs.", new_hours, new_minutes, new_seconds);
}
