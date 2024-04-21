import re

regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"


# for validating an Email
def checkEmailValidation(email):
    if re.fullmatch(regex, email):
        return "Valid Email"
    else:
        return "Invalid Email"
