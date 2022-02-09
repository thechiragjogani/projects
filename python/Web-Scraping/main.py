#!/usr/bin/python3
from bs4 import BeautifulSoup as bs
import requests
import csv
import concurrent.futures

def getDoctorInfo(pageNo):
    print(f"Scraping page {pageNo}.")
    html = requests.post(URL+"/find-a-provider/", data={"PhysicianSearch$FTR01$PagingID": pageNo}).text
    soup = bs(html, "html.parser")

    try:
        # Getting information for each doctor on the page
        for currentDoctor in range(1, 13):  # 12 doctors on a page
            data = []  # Storing information of each doctor
            doctor = soup.find("li", class_="half item-"+str(currentDoctor))
            doctorLink = doctor.a.get("href")
            doctorURL = URL + str(doctorLink)
            if(doctorLink != ""):
                doctorPage = requests.get(doctorURL).text
                doctorSoup = bs(doctorPage, "html.parser")

                fullName = doctorSoup.find("strong", class_="title-style-1 mar-b-2").text
                data.append(fullName)

                speciality = doctorSoup.select("div span a")[0].text
                data.append(speciality)

                additionalSpeciality = doctorSoup.select("div span a")[1].text.replace(",", "")
                if additionalSpeciality == "Get Directions":
                    additionalSpeciality = ""
                data.append(additionalSpeciality)

                addressPhone = str(doctorSoup.find("address").text).replace("\t", " ").split("\n")

                address = addressPhone[0]

                try:
                    practice = doctorSoup.find("strong", class_="title-style-5").text
                except AttributeError as e:
                    practice = ""

                if(practice == ""):
                    fullAddress = address
                else:
                    fullAddress = practice + " ; " + address

                data.append(fullAddress)
                data.append(practice)
                data.append(address)

                zipcode = address.split()[-1]

                if zipcode.isnumeric():
                    CITY = address.split()[-3].replace(",", "").replace("#","")
                    state = address.split()[-2]
                else:
                    CITY = address.split()[-2].replace(",", "").replace("#","")
                    state = address.split()[-1]
                    zipcode = ""

                city = ""
                for i in range(len(CITY)):
                    if CITY[i].isdigit():
                        city += ""
                    else:
                        city += CITY[i]

                data.append(city)
                data.append(state)
                data.append(zipcode)

                phone = addressPhone[1].strip()
                data.append(phone)
                data.append(doctorURL)
                # Writing data to CSV file
                writer.writerow(data)
    except:
        pass


if __name__ == "__main__":
    URL = "https://www.stfrancismedicalcenter.com"
    header = ["Full_Name", "Specialty", "Add_Specialty", "Full_Address", "Practice", "Address", "City", "State", "Zip", "Phone", "URL"]
    outputFile = open("output.csv", "w", newline="")
    writer = csv.writer(outputFile)
    writer.writerow(header)

    html = requests.post(URL+"/find-a-provider/").text
    soup = bs(html, "html.parser")
    start = int(soup.find("span", class_="start").text)  # Starting page number
    end = int(soup.find("span", class_="end").text)  # Ending page number

    # Creating and starting threads for each page
    with concurrent.futures.ThreadPoolExecutor(max_workers=end) as executor:
        executor.map(getDoctorInfo, range(start, end+1))

    print("\nProgram completed successfully, check output.csv in current directory.")
