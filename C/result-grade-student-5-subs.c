#include <stdio.h>
#include <conio.h>

void main()
{
	//Taking marks of student as input from the user (where a, b, c, d, e are subjects).
	int a, b, c, d, e, total_marks_obtained, total_marks = 500, result;
	printf("Please enter the marks of student: ");
	scanf("%d%d%d%d%d", &a, &b, &c, &d, &e);

	//Calculating the total marks obtained by the student.
	total_marks_obtained = a + b + c + d + e;

	//Calculating the result of the student.
	result = total_marks_obtained / 5;

	//Calculating the division of the student as per the marks obtained by the student and printing it to show it to the user.
	if (result >= 60)
	{
		printf("Result of the student is %d percentage!\n", result);
		printf("1 division");
	}
	else if (result >= 50 && result < 60)
	{
		printf("Result of the student is %d percentage!\n", result);
		printf("2 division");
	}
	else if (result >= 40 && result < 50)
	{
		printf("Result of the student is %d percentage!\n", result);
		printf("3 division");
	}
	else if (result >= 35 && result < 40)
	{
		printf("Result of the student is %d percentage!\n", result);
		printf("pass");
	}
	else if (result < 35)
	{
		printf("Result of the student is %d percentage!\n", result);
		printf("fail");
	}
	getch();
}