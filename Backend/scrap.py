from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time
from selenium.webdriver.chrome.options import Options


def scrap_track (data):
    try:
    # Set up Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(options = chrome_options)


        driver.get("https://neapay.com/online-tools/card-track1-track2-generator.html")

        wait = WebDriverWait(driver, 10)

        # Fill in the fields using explicit waits
        fields = {
            "textBoxPan":data[0],  # Card number
            "textBoxName": data[1],        # Cardholder name
            "textBoxExpDate": data[2],           # Expiration date
            "textBoxSvcCode": data[3],        # Service code
            "textBoxPvv": data[4]  ,             # PIN
            "textBoxCvv" : data[5],
            "textBoxDiscData" : data[6]
        }

        for field_id, value in fields.items():
            element = wait.until(EC.presence_of_element_located((By.ID, field_id)))
            element.clear()
            element.send_keys(value)

        generate_button = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//button[text()='Generate Track 1 and Track 2']")))

        # Scroll into view and ensure it's clickable
        driver.execute_script("arguments[0].scrollIntoView(true);", generate_button)

        try:
            wait.until(EC.element_to_be_clickable(
                (By.XPATH, "//button[text()='Generate Track 1 and Track 2']"))).click()
        except:
            driver.execute_script("arguments[0].click();", generate_button)

        track1_visa = wait.until(EC.presence_of_element_located(
            (By.ID, "textBoxTrack1v"))).get_attribute("value")
        track2_visa = wait.until(EC.presence_of_element_located(
            (By.ID, "textBoxTrack2v"))).get_attribute("value")
        driver.quit()
        print("Scrap")
        return track1_visa.strip(), track2_visa.strip()
    except:
        return "TimeOut"
        
if __name__ == "__main__":
    print("Done")

