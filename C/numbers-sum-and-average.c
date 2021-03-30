//Program in C to read 10 numbers from keyboard and find their sum and average.
#include <stdio.h>
#include <conio.h>

void main()
{
    int num = 1, new_num, sum = 0, average;
    
	for (num; num < 11; num++)
    {
        printf("Please enter %d number: ", num);
        scanf("%d", &new_num);
        sum = sum + new_num;
    }
    average = sum / 10;
    printf("The sum of the given numbers are: %d", sum);
    printf("\nThe average of given numbers is: %d", average);
    getch();
}
