//Program to find if a given number is an even number or an odd number via user input.
#include <stdio.h>
#include <conio.h>
void main()
{
	//Getting input from user
	int number;
	printf("Please enter a number to check if the given number is an even number or an odd number: ");
	scanf("%d", &number);

	//Checking if the number is even or odd and printing it.
	if (number == 0)
	{
		printf("\n%d is neither an even number nor an odd number!", number);
	}
	else if (number % 2 == 0)
	{
		printf("\n%d is an even number!", number);
	}
	else if (number % 2 != 0)
	{
		printf("\n%d is an odd number!", number);
	}
	else
	{
		printf("\nPlease enter a valid whole number!");
	}
	getch();
}
