import phonenumbers

number = str(input("Enter a number with country code (E.g +91123456789): "))

from phonenumbers import geocoder
chNumber = phonenumbers.parse(number, "CH")
print(geocoder.description_for_number(chNumber, "en"))

from phonenumbers import carrier
serviceNumber = phonenumbers.parse(number, "RO")
print(carrier.name_for_number(serviceNumber, "en"))