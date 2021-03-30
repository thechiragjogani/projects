#include <stdio.h>
#include <conio.h>
#include <math.h>
int main()
{
	int Number, i, count;
	printf("Prime numbers from 1 - 100 are:\n");
	for (Number = 1; Number <= 100; Number++)
	{
		count = 0;
		for (i = 2; i < Number; i++)
		{
			if (Number % i == 0)
			{
				count++;
				break;
			}
		}
		if (count == 0 && Number != 1)
		{
			printf("%d\n", Number);
		}
	}
	return 0;
}
