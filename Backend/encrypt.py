import random

def generate_pin():
    pin = random.randint(1000,9999)
    return pin

def generate_cvv ():
    pin = random.randint(100,999)
    return pin

def generate_disc():
    pin = random.randint(10**9, 9999999999)
    return pin

if __name__ == "__main__":
    print (generate_disc())