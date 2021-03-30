#include <stdio.h>
#include <conio.h>
void main()
{
	int year;
	printf("Enter a year: ");
	scanf("%d", &year);
	if (year % 4 == 0)
	{
		if (year % 100 != 0)
		{
			printf("\n%d is a LEAP YEAR.", year);
		}
		else
		{
			printf("\n%d is NOT a LEAP YEAR.", year);
		}
	}
	else if (year % 400 == 0)
	{
		printf("\n%d is a LEAP YEAR.", year);
	}
	getch();
}