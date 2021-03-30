#include <stdio.h>
#include <conio.h>
void main()
{
	int cp, sp, result;
	printf("Enter a Cost Price: ");
	scanf("%d", &cp);
	printf("Enter a Selling Price: ");
	scanf("%d", &sp);
	result = sp - cp;
	if (result == 0)
	{
		printf("No profit or loss.");
	}
	else if (result > 0)
	{
		printf("Profit of %d.", result);
	}
	else
	{
		printf("Loss of %d.", result);
	}
	getch();
}
