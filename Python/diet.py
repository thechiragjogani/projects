print("Enter your gender!")
print("1. Male")
print("2. Female")

gender = int(input("Enter your choice: "))
weight = int(input("Enter your weight in kg: "))
height = int(input("Enter your height in cm: "))
age = int(input("Enter your age in years: "))

if (gender == 1):
    bmr = (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age))
elif (gender == 2):
    bmr = (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))

print("Enter your activity level!")
print("1. No exercise")
print("2. Basic Exercise (30 mins to 1 hour)")
print("3. Intermediate Exercise (2 hours)")

activity = int(input("Enter your choice: "))

exercise = None  # Default value of calories burnt by exercising!
protein = None

if (activity == 1):
    exercise = 0  # Approx calories burnt through exercise
    protein = weight * 0.8

elif (activity == 2):
    exercise = 300  # Approx calories burnt through exercise
    protein = weight * 1.2

elif (activity == 3):
    exercise == 500  # Approx calories burnt through exercise
    protein = weight * 2

out = bmr + exercise

print()
print("Enter your goal! ")
print("1. Weight Loss (Fat Loss)")
print("2. Weight Gain (Muscle Gain)")

goal = int(input("Enter your choice: "))

fat = None
cut = None
cal_in = None

if (goal == 1):
    fat = int(input("\nHow much kg of fat you want to lose in a month? "))
    cut = ((fat * 7700) / 30)
    cal_in = out - cut
    print("\nYou need to intake " + str(round(cal_in)) +
          " calories per day to achieve your fat loss goal!")

elif (goal == 2):
    cal_in = out + 300
    print("You need to intake " + str(cal_in) +
          " calories per day to gain muscle!")

protein_macro = protein
fat_macro = weight
carb_macro = (out - (protein_macro * 4) - (fat_macro * 9)) / 4

print(
    f"\nYou bmr is {round(bmr)} cals, you should intake {round(protein_macro)}g of protein, {round(fat_macro)}g of fat and {round(carb_macro)}g of carbs.")
